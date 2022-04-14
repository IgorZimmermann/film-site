import { Formik } from 'formik'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Submit } from '../../components/Form/Submit'
import { Wrapper } from '../../components/Form/Wrapper'
import { PageWrapper } from '../../components/PageWrapper'
import { useLogoutMutation } from '../../generated/graphql'

const Logout: NextPage = () => {
	const router = useRouter()
	const [logout] = useLogoutMutation()
	return (
		<PageWrapper title="Logout">
			<Formik
				initialValues={{}}
				onSubmit={async () => {
					const response = await logout()
					if (response.data?.logout !== null && response.data?.logout) {
						router.push('/welcome')
					}
				}}
			>
				{() => (
					<Wrapper title="Logout">
						<Submit value="Log me out" />
					</Wrapper>
				)}
			</Formik>
		</PageWrapper>
	)
}

export default Logout
