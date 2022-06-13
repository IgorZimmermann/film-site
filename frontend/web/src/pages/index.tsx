import type { NextPage } from 'next'
import { Collection } from '../components/Focus/Collection'
import { Media } from '../components/Focus/Media'
import { Wrapper } from '../components/Focus/Wrapper'
import { PageWrapper } from '../components/PageWrapper'
import { ResumeList } from '../components/ResumeList/List'
import { useHomepageQuery } from '../generated/graphql'
import { useIsAuth } from '../utils/useIsAuth'

const Home: NextPage = () => {
	useIsAuth()
	const { data, loading } = useHomepageQuery()
	return (
		<PageWrapper title="Home" navbar={true}>
			{loading && !data ? (
				<span>loading...</span>
			) : (
				<Wrapper>
					{data?.homepage.map((x) => (
						<div key={x.data}>
							{x.type === 'media' && <Media id={x.data} />}
							{x.type === 'resume' && <ResumeList />}
							{x.type === 'collection' && <Collection id={x.data} />}
						</div>
					))}
				</Wrapper>
			)}
		</PageWrapper>
	)
}

export default Home
