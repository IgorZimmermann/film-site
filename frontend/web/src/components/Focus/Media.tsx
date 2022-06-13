import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {
	GetIsWatchlistDocument,
	SourceType,
	useGetIsWatchlistQuery,
	useGetMediaByIdQuery,
	useGetSourceByMediaQuery,
	useIsProgressLazyQuery,
	useToggleWatchlistMutation,
} from '../../generated/graphql'
import { Content } from './Content'

const MetaWrapper = styled.div<{ top?: boolean }>`
	display: flex;
	flex-direction: column;
	position: absolute;
	${(props) => (props.top ? 'top: 40px;' : 'bottom: 40px;')}
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

	&:hover {
		cursor: pointer;
	}
`

interface MediaProps {
	id: string
	small?: boolean
	collection?: boolean
}

export const Media: React.FC<MediaProps> = ({ id, small, collection }) => {
	const { loading, data } = useGetMediaByIdQuery({
		variables: {
			options: {
				id,
			},
		},
	})

	const [
		isProgressQuery,
		{ loading: isProgressLoading, data: isProgressData },
	] = useIsProgressLazyQuery()

	const { loading: sourceLoading, data: sourceData } = useGetSourceByMediaQuery(
		{
			variables: {
				options: {
					mediaId: id,
					type: SourceType.Movie,
				},
			},
			onCompleted(data) {
				if (
					data.getSourceByMedia &&
					data.getSourceByMedia !== null &&
					data.getSourceByMedia.length !== 0
				) {
					isProgressQuery({
						variables: {
							options: { mediaSourceId: data.getSourceByMedia[0].id },
						},
					})
				}
			},
		}
	)

	const { loading: watchlistLoading, data: watchlistData } =
		useGetIsWatchlistQuery({
			variables: {
				options: {
					mediaId: id,
				},
			},
		})

	const [toggleWatchlist] = useToggleWatchlistMutation()

	return (
		<>
			{loading && !data ? (
				<span>loading...</span>
			) : (
				<Content
					img={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${id}/cover1.jpg`}
					small={small}
				>
					<MetaGradient>
						<MetaWrapper top={collection}>
							<MetaTitle
								src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${id}/title.png`}
							/>
							<MetaTagline>{data?.getMediaById?.tagline}</MetaTagline>
							<MetaButtonWrapper>
								{data?.getMediaById?.isAvailable ? (
									<>
										{!sourceLoading &&
										sourceData &&
										sourceData.getSourceByMedia ? (
											<>
												{sourceData.getSourceByMedia === null ||
												sourceData.getSourceByMedia.length === 0 ? (
													<MetaButton theme={'light'}>Unavailable</MetaButton>
												) : (
													<Link
														href={`/player/${sourceData?.getSourceByMedia[0].id}?from=/media/${data?.getMediaById?.url}`}
														passHref
													>
														{!isProgressLoading &&
														isProgressData &&
														isProgressData.isProgress &&
														isProgressData.isProgress !== null ? (
															<MetaButton theme={'light'}>
																Resume Movie
															</MetaButton>
														) : (
															<MetaButton theme={'light'}>
																Play Movie
															</MetaButton>
														)}
													</Link>
												)}
											</>
										) : (
											<MetaButton theme={'light'}>Loading</MetaButton>
										)}
									</>
								) : (
									<MetaButton theme={'light'}>
										Available from{' '}
										{moment(data?.getMediaById?.available_from).format(
											'DD MMMM'
										)}
									</MetaButton>
								)}

								{collection ? (
									<Link href={`/media/${data?.getMediaById?.url}`} passHref>
										<MetaButton>More Info</MetaButton>
									</Link>
								) : (
									<>
										{!watchlistLoading && watchlistData ? (
											<>
												{watchlistData.isWatchlist === true ? (
													<MetaButton
														onClick={async () => {
															await toggleWatchlist({
																variables: {
																	options: {
																		mediaId: id,
																	},
																},
																refetchQueries: [GetIsWatchlistDocument],
															})
														}}
													>
														Remove from Watchlist
													</MetaButton>
												) : (
													<MetaButton
														onClick={async () => {
															await toggleWatchlist({
																variables: {
																	options: {
																		mediaId: id,
																	},
																},
																refetchQueries: [GetIsWatchlistDocument],
															})
														}}
													>
														Add to Watchlist
													</MetaButton>
												)}
											</>
										) : (
											<MetaButton>Loading</MetaButton>
										)}
									</>
								)}
							</MetaButtonWrapper>
						</MetaWrapper>
					</MetaGradient>
				</Content>
			)}
		</>
	)
}
