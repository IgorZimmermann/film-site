import React, { createRef, useCallback, useEffect, useState } from 'react'
import { useFullscreen } from 'rooks'
import styled from 'styled-components'
import {
	MediaSource,
	SourceType,
	useIsProgressQuery,
	useUpdateProgressMutation,
} from '../../generated/graphql'

const PlayerWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
	background-color: #000000;
`

interface PlayerControlsProps {
	show: boolean
}

const PlayerControls = styled.div<PlayerControlsProps>`
	height: 100vh;
	width: 100vw;
	opacity: ${(props) => (props.show ? '1' : '0')};
	background: linear-gradient(
		270deg,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0.8) 70%,
		rgba(0, 0, 0, 1) 100%
	);
	background: -webkit-linear-gradient(
		270deg,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0.8) 70%,
		rgba(0, 0, 0, 1) 100%
	);
`

const PlayerControlsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(100% - 80px);
	margin: 0 40px;
	position: absolute;
	bottom: 40px;
`

const PlayerControlsRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;

	& > :nth-child(1):not(:only-child) {
		justify-content: flex-start;
	}

	& > :nth-child(2) {
		justify-content: center;
	}

	& > :nth-child(3),
	& > :only-child {
		justify-content: flex-end;
	}

	&:not(:last-child) {
		margin-bottom: 10px;
	}
`

const PlayerControlsGroup = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	width: calc(100% / 3);
`

const PlayerControlsTitle = styled.span`
	font-size: 20px;
	font-family: 'Roboto', sans-serif;
	font-weight: 700;
	color: #ffffff;
`

const PlayerVideo = styled.video`
	width: 100%;
	max-height: 100vh;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
`

interface PlayerButtonProps {
	x?: string
	y?: string
}

const PlayerButton = styled.button<PlayerButtonProps>`
	background: none;
	padding: none;
	border: none;
	margin: 0;
	color: #ffffff;
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 15px;
	text-transform: uppercase;
	font-weight: 700;
	position: ${(props) => (props.x || props.y ? 'absolute' : 'static')};
	top: ${(props) => (props.x || props.y ? props.y : 'auto')};
	left: ${(props) => (props.x || props.y ? props.x : 'auto')};

	&:hover {
		cursor: pointer;
		color: #dadada;
	}
`

const PlayerSubtitlesWrapper = styled.div`
	padding: 20px;
	width: 150px;
	background-color: #00000059;
`

const PlayerSubtitlesTitle = styled.span`
	font-size: 12px;
	text-transform: uppercase;
	font-weight: 700;
	color: #ffffff;
`

const PlayerSubtitlesList = styled.ul`
	list-style-type: none;
	margin: 0;
	margin-top: 10px;
	padding: 0;
`

interface PlayerSubtitlesListItemProps {
	selected: boolean
}

const PlayerSubtitlesListItem = styled.li<PlayerSubtitlesListItemProps>`
	color: #ffffff;
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 15px;
	text-transform: uppercase;
	font-weight: ${(props) => (props.selected ? '700' : '400')};

	&:hover {
		cursor: pointer;
		color: #dadada;
	}
`

interface PlayerProps {
	playerSource: MediaSource
	onExit: () => void
}

export const Player: React.FC<PlayerProps> = ({ playerSource, onExit }) => {
	const [paused, setPaused] = useState<boolean>(true)
	const [currentSubtitle, setCurrentSubtitle] = useState<string>('off')
	const [showControls, setShowControls] = useState<boolean>(true)
	const [showSubtitles, setShowSubtitles] = useState<boolean>(false)
	const vidRef = createRef<HTMLVideoElement>()

	const [updateProgress] = useUpdateProgressMutation()
	const { data: isProgress } = useIsProgressQuery({
		variables: {
			options: {
				mediaSourceId: playerSource.id,
			},
		},
	})

	const playerRef = createRef<HTMLDivElement>()
	const handle = useFullscreen()

	function togglePlay() {
		if (vidRef.current) {
			if (paused) {
				vidRef.current.play()
			} else {
				vidRef.current.pause()
			}
		}
	}

	function toggleSubtitle(id: string) {
		if (vidRef.current) {
			for (let i = 0; i < vidRef.current.textTracks.length; i++) {
				vidRef.current.textTracks[i].mode = 'disabled'
			}
			if (id === 'off') {
				setCurrentSubtitle('off')
			}
			let subtitle = vidRef.current.textTracks.getTrackById(id)
			if (subtitle) {
				if (subtitle?.mode === 'showing') {
					subtitle.mode = 'disabled'
					setCurrentSubtitle('off')
				} else {
					subtitle.mode = 'showing'
					setCurrentSubtitle(id)
				}
			}
		}
		setShowSubtitles(false)
	}

	function togglePictureInPicture() {
		if (vidRef.current) {
			if (document.pictureInPictureElement) {
				document.exitPictureInPicture()
			} else {
				if (document.pictureInPictureEnabled) {
					vidRef.current.requestPictureInPicture()
				}
			}
		}
	}

	function toggleShowSubtitles() {
		showSubtitles ? setShowSubtitles(false) : setShowSubtitles(true)
	}

	function toggleFullscreen() {
		if (handle?.isFullscreen) {
			handle.exit()
		} else {
			handle?.request(playerRef.current!)
		}
	}

	const seek = useCallback(
		(time: number) => {
			if (vidRef.current) {
				vidRef.current.currentTime = time
			}
		},
		[vidRef]
	)

	useEffect(() => {
		let controlsTimeout = setTimeout(() => {
			!paused && setShowControls(false)
		}, 3000)

		document.addEventListener('mousemove', () => {
			clearTimeout(controlsTimeout)
			setShowControls(true)
			controlsTimeout = setTimeout(() => {
				!paused && setShowControls(false)
			}, 3000)
		})

		let trackInterval: NodeJS.Timer

		if (vidRef.current) {
			vidRef.current.addEventListener('play', () => {
				setPaused(false)
			})
			vidRef.current.addEventListener('pause', () => {
				setPaused(true)
			})
			if (isProgress?.isProgress && isProgress?.isProgress !== null) {
				vidRef.current.addEventListener('loadedmetadata', () => {
					seek(isProgress.isProgress?.progress!)
				})
			}

			if (playerSource.type === SourceType.Movie) {
				trackInterval = setInterval(async () => {
					if (!vidRef.current?.paused) {
						const response = await updateProgress({
							variables: {
								options: {
									duration: vidRef.current?.duration
										? Math.floor(vidRef.current?.duration)
										: 1000,
									progress: vidRef.current?.currentTime
										? Math.floor(vidRef.current?.currentTime)
										: 0,
									mediaSourceId: playerSource.id,
								},
							},
						})
						if (response.data && response.data.updateProgress.finished) {
							clearInterval(trackInterval)
						}
					}
				}, 5000)
			}
		}

		return () => {
			clearInterval(trackInterval)
		}
	}, [
		setShowControls,
		paused,
		vidRef,
		updateProgress,
		playerSource,
		isProgress,
		seek,
	])

	if (playerSource) {
		return (
			<PlayerWrapper ref={playerRef}>
				<PlayerVideo
					src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${playerSource.mediaId}/${playerSource.src}`}
					/* poster={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${playerSource.mediaId}/${playerSource.thumbnail}`} */
					ref={vidRef}
					autoPlay
				>
					{playerSource.subtitles.map((x) => (
						<track
							key={x.id}
							id={x.id}
							kind={'captions'}
							label={x.language}
							srcLang={x.lang}
							src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${playerSource.mediaId}/${x.src}`}
						/>
					))}
				</PlayerVideo>
				<PlayerControls show={showControls}>
					<PlayerControlsWrapper>
						{showSubtitles && (
							<PlayerControlsRow>
								<div></div>
								<PlayerSubtitlesWrapper>
									<PlayerSubtitlesTitle>subtitles</PlayerSubtitlesTitle>
									<PlayerSubtitlesList>
										{[{ id: 'off', lang: '', language: 'Off', src: '' }]
											.concat(playerSource.subtitles)
											.map((x) => (
												<PlayerSubtitlesListItem
													key={x.id}
													selected={currentSubtitle === x.id}
													onClick={() => toggleSubtitle(x.id)}
												>
													{x.language}
												</PlayerSubtitlesListItem>
											))}
									</PlayerSubtitlesList>
								</PlayerSubtitlesWrapper>
							</PlayerControlsRow>
						)}
						<PlayerControlsRow>
							<PlayerControlsGroup>
								<PlayerControlsTitle>{playerSource.title}</PlayerControlsTitle>
							</PlayerControlsGroup>
							<PlayerControlsGroup>
								<PlayerButton onClick={togglePlay}>
									{paused ? 'play' : 'pause'}
								</PlayerButton>
							</PlayerControlsGroup>
							<PlayerControlsGroup>
								{document.pictureInPictureEnabled && (
									<PlayerButton onClick={togglePictureInPicture}>
										picture-in-picture
									</PlayerButton>
								)}
								{(window as any).WebKitPlaybackTargetAvailabilityEvent && (
									<PlayerButton
										onClick={() => {
											if (vidRef.current) {
												;(
													vidRef.current as any
												).webkitShowPlaybackTargetPicker()
											}
										}}
									>
										airplay
									</PlayerButton>
								)}
								{playerSource.subtitles.length > 0 && (
									<PlayerButton onClick={toggleShowSubtitles}>
										subtitles
									</PlayerButton>
								)}
								<PlayerButton onClick={toggleFullscreen}>
									{handle?.isFullscreen ? 'exit fullscreen' : 'fullscreen'}
								</PlayerButton>
							</PlayerControlsGroup>
						</PlayerControlsRow>
					</PlayerControlsWrapper>
				</PlayerControls>
				{showControls && !handle?.isFullscreen && (
					<PlayerButton x="40px" y="40px" onClick={onExit}>
						exit
					</PlayerButton>
				)}
			</PlayerWrapper>
		)
	} else return null
}
