import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {
	Media,
	SourceType,
	useGetSourceByMediaQuery,
} from '../../generated/graphql'

const BonusContentRowWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`

const BonusContentTitle = styled.span`
	font-size: 15px;
	font-weight: 700;
	margin-bottom: 10px;
`

const BonusContentWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	overflow-x: scroll;

	scrollbar-width: none;
	-ms-overflow-style: -ms-autohiding-scrollbar;

	&::-webkit-scrollbar {
		display: none;
	}

	& > :not(:last-child) {
		margin-right: 5px;
	}
`

const BonusContentItem = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;

	&:hover {
		cursor: pointer;
	}
`

const BonusContentImage = styled.div<{ src: string }>`
	height: calc((25vw - (160px / 4) - (30px / 4)) / 16 * 9);
	min-width: calc(25vw - (160px / 4) - (30px / 4));

	background-image: url(${(props) => props.src});
	background-color: pink;
	background-size: cover;

	margin-bottom: 10px;
`

const BonusContentName = styled.span`
	font-size: 13px;
	font-weight: 400;
`

interface BonusContentProps {
	media: Media
}

export const BonusContent: React.FC<BonusContentProps> = ({ media }) => {
	const { loading: trailersLoading, data: trailers } = useGetSourceByMediaQuery(
		{
			variables: {
				options: {
					mediaId: media.id,
					type: SourceType.Trailer,
				},
			},
		}
	)
	const { loading: clipsLoading, data: clips } = useGetSourceByMediaQuery({
		variables: {
			options: {
				mediaId: media.id,
				type: SourceType.Clip,
			},
		},
	})

	return (
		<>
			{!trailersLoading &&
				trailers &&
				trailers.getSourceByMedia &&
				trailers.getSourceByMedia.length > 0 &&
				!clipsLoading &&
				clips &&
				clips.getSourceByMedia &&
				clips.getSourceByMedia.length > 0 && (
					<BonusContentRowWrapper>
						<BonusContentTitle>Bonus Content</BonusContentTitle>
						<BonusContentWrapper>
							{trailers.getSourceByMedia.map((x) => (
								<Link
									key={x.id}
									href={`/player/${x.id}?from=/media/${media.url}`}
									passHref
								>
									<BonusContentItem>
										<BonusContentImage
											src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${media.id}/${x.thumbnail}`}
										/>
										<BonusContentName>{x.title}</BonusContentName>
									</BonusContentItem>
								</Link>
							))}
							{clips.getSourceByMedia.map((x) => (
								<Link
									key={x.id}
									href={`/player/${x.id}?from=/media/${media.url}`}
									passHref
								>
									<BonusContentItem>
										<BonusContentImage
											src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${media.id}/${x.thumbnail}`}
										/>
										<BonusContentName>{x.title}</BonusContentName>
									</BonusContentItem>
								</Link>
							))}
						</BonusContentWrapper>
					</BonusContentRowWrapper>
				)}
		</>
	)
}
