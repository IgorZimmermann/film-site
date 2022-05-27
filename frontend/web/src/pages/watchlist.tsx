import type { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import { PageWrapper } from '../components/PageWrapper'
import { useGetWatchlistQuery } from '../generated/graphql'

const WatchlistTitle = styled.h1`
	font-size: 40px;
	font-weight: 700;
	margin: 0;
	margin-top: 140px;
	margin-bottom: 100px;
	text-align: center;
`

const MediaGrid = styled.div`
	display: grid;
	margin: 0 40px;
	grid-template-columns: repeat(4, calc(25vw - (160px / 4) - (30px / 4)));
	grid-gap: 30px;
`

const Media = styled.div<{ src: string }>`
	height: calc((25vw - (160px / 4) - (30px / 4)) / 16 * 9);
	min-width: calc(25vw - (160px / 4) - (30px / 4));

	background-image: url(${(props) => props.src});
	background-size: cover;

	&:hover {
		cursor: pointer;
	}
`

const Watchlist: NextPage = () => {
	const { loading, data } = useGetWatchlistQuery()

	return (
		<PageWrapper title="Your Watchlist" navbar>
			<WatchlistTitle>Your Watchlist</WatchlistTitle>
			{!loading && data && data.getWatchlist !== null && (
				<MediaGrid>
					{data.getWatchlist.map((x) => (
						<Link key={x.id} href={`/media/${x.media.url}`} passHref>
							<Media
								src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${x.media.id}/cover1.jpg`}
							/>
						</Link>
					))}
				</MediaGrid>
			)}
		</PageWrapper>
	)
}

export default Watchlist
