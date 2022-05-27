import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageWrapper } from '../../components/PageWrapper'
import { Player } from '../../components/Player/Player'
import { useGetSourceByIdQuery } from '../../generated/graphql'

const PlayerPage: NextPage = () => {
	const router = useRouter()
	const { id, from } = router.query
	const { loading, data } = useGetSourceByIdQuery({
		variables: {
			options: {
				id: id as string,
			},
		},
	})

	return (
		<PageWrapper title={data?.getSourceById?.title || 'Loading'}>
			{!loading && data && data.getSourceById ? (
				<Player
					playerSource={data?.getSourceById}
					onExit={() => {
						router.push(from as string)
					}}
				/>
			) : (
				<span>loading...</span>
			)}
		</PageWrapper>
	)
}

export default PlayerPage
