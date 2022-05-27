import React, { useState } from 'react'
import styled from 'styled-components'
import {
	useGetCollectionByIdQuery,
	useGetMediaByIdLazyQuery,
} from '../../generated/graphql'
import { Content } from './Content'
import { Media as MediaFocus } from './Media'

const MetaWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 40px;
	left: 40px;
	width: 450px;
`

const MetaGradient = styled.div`
	height: 100%;
	width: 100%;
	background: linear-gradient(
		180deg,
		#00000000 0%,
		#000000cc 90%,
		#000000 100%
	);
`

const MetaTitle = styled.div<{ src: string }>`
	display: block;
	height: 170px;
	width: 100%;
	margin-bottom: 15px;

	background-image: url(${(props) => props.src});
	background-size: contain;
	background-position: left bottom;
	background-repeat: no-repeat;
`

const MetaTitleText = styled.h1`
	font-size: 50px;
	font-family: 'Roboto', sans-serif;
	font-weight: 700;
	max-width: 400px;
	color: #ffffff;
	margin-bottom: 15px;
`

const MetaTagline = styled.p`
	font-size: 16px;
	font-weight: 400;
	color: #ffffff;
	margin: 0;
	margin-bottom: 15px;
`

const MetaButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 15px;

	& :not(:last-of-type) {
		margin-right: 25px;
	}
`

const MetaButton = styled.a`
	font-size: 15px;
	font-weight: 600;
	color: ${(props) => (props.theme === 'light' ? '#1f1f1f' : '#ffffff')};
	background-color: ${(props) =>
		props.theme === 'light' ? '#ffffff' : '#00000059'};
	width: 45%;
	padding: 15px 0;
	text-align: center;
	text-decoration: none;
`

const MediaWrapper = styled.div`
	position: absolute;
	bottom: 40px;
	left: 40px;
	width: calc(100% - 80px);
`

const MediaRowWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	overflow-x: scroll;

	scrollbar-width: none;
	-ms-overflow-style: -ms-autohiding-scrollbar;

	&::-webkit-scrollbar {
		display: none;
	}

	& :not(:last-child) {
		margin-right: 10px;
	}
`

const Media = styled.div<{ src: string; active: boolean }>`
	height: calc((25vw - (160px / 4) - (30px / 4)) / 16 * 9);
	min-width: calc(25vw - (160px / 4) - (30px / 4));

	background-image: url(${(props) => props.src});
	background-size: cover;

	box-shadow: ${(props) => (props.active ? `inset 0 0 0 4px #ffffff` : 'none')};

	&:hover {
		cursor: pointer;
	}
`

interface CollectionProps {
	id: string
}

export const Collection: React.FC<CollectionProps> = ({ id }) => {
	const { data, loading } = useGetCollectionByIdQuery({
		variables: {
			options: {
				id,
			},
		},
	})
	const [showMedia, setShowMedia] = useState<boolean>(false)

	const [getMedia, { data: media, loading: mediaLoading }] =
		useGetMediaByIdLazyQuery()

	return (
		<div>
			{loading && !data ? (
				<span>loading...</span>
			) : (
				<Content
					img={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${
						!showMedia || !media ? id : media.getMediaById?.id
					}/cover1.jpg`}
				>
					<MetaGradient>
						{!showMedia || !media || mediaLoading ? (
							<MetaWrapper>
								<MetaTitle
									src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${id}/title.png`}
								/>
								<MetaTagline>
									{data?.getCollectionById?.description}
								</MetaTagline>
							</MetaWrapper>
						) : (
							<MediaFocus id={media.getMediaById?.id as string} collection />
						)}
						<MediaWrapper>
							<MediaRowWrapper>
								{data?.getCollectionById?.medias.map((x, i) => (
									<Media
										key={i}
										id={x.media?.id}
										active={
											showMedia && media?.getMediaById?.id === x.media?.id
										}
										src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${x.media?.id}/cover2.jpg`}
										onClick={() => {
											if (
												!showMedia ||
												(media && media.getMediaById?.id !== x.media?.id)
											) {
												setShowMedia(true)
												getMedia({
													variables: {
														options: {
															id: x.media?.id!,
														},
													},
												})
											} else {
												setShowMedia(false)
											}
										}}
									/>
								))}
							</MediaRowWrapper>
						</MediaWrapper>
					</MetaGradient>
				</Content>
			)}
		</div>
	)
}
