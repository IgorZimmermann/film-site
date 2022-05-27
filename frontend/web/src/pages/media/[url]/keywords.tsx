import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Navbar } from '../../../components/Media/Navbar'
import { PageWrapper } from '../../../components/PageWrapper'
import { Media, useGetMediaByUrlQuery } from '../../../generated/graphql'

const Keywords = styled.p`
	margin: 80px 40px 0 40px;
	width: calc(100% - 80px);
	font-size: 15px;
	font-weight: 400;

	& > a {
		color: inherit;

		&:hover {
			cursor: pointer;
			color: #ffffff;
			background-color: #000000;
		}

		&:not(:last-child)::after {
			content: ', ';
			font-size: 15px;
		}
	}
`

const MediaKeywords: NextPage = () => {
	const router = useRouter()
	const { url } = router.query
	const { loading, data } = useGetMediaByUrlQuery({
		variables: {
			options: {
				url: url as string,
			},
		},
	})
	return (
		<>
			{!loading && data ? (
				<PageWrapper title={`Keywords | ${data.getMediaByUrl?.title}`} navbar>
					<Navbar data={data.getMediaByUrl as Media} subtitle="Keywords" />
					<Keywords>
						{data.getMediaByUrl?.keywords.map((x, i) => (
							<a key={i}>{x}</a>
						))}
					</Keywords>
				</PageWrapper>
			) : (
				<span>loading...</span>
			)}
		</>
	)
}

export default MediaKeywords
