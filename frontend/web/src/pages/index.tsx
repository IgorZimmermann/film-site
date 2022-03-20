import type { NextPage } from 'next'
import { useMeQuery } from '../generated/graphql'
import { useIsAuth } from '../utils/useIsAuth'

const Home: NextPage = () => {
	useIsAuth()
	const { data, loading } = useMeQuery()
	return (
		<>
			{loading && !data?.me ? (
				<h1>hello world</h1>
			) : (
				<h1>hello, {data?.me?.first_name}</h1>
			)}
		</>
	)
}

export default Home
