import { Formik } from 'formik'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Input } from '../../components/Form/Input'
import { Submit } from '../../components/Form/Submit'
import { Wrapper } from '../../components/Form/Wrapper'
import { PageWrapper } from '../../components/PageWrapper'
import { useRegisterMutation } from '../../generated/graphql'

const Register: NextPage = () => {
	const router = useRouter()
	const [register] = useRegisterMutation()
	return (
		<PageWrapper>
			<Formik
				initialValues={{
					email: '',
					first_name: '',
					last_name: '',
					password: '',
				}}
				onSubmit={async (values, { setErrors }) => {
					const response = await register({
						variables: {
							options: {
								email: values.email,
								first_name: values.first_name,
								last_name: values.last_name,
								password: values.password,
							},
						},
					})
					if (response.data?.register !== null && response.data?.register) {
						router.push('/auth/login')
					}
				}}
			>
				{({ errors }) => (
					<Wrapper title="Register">
						<Input
							type={'email'}
							name="email"
							placeholder="steve@byluni.com"
							description="Used for logging in"
							error={errors.email}
						/>
						<Input
							type={'text'}
							name="first_name"
							placeholder="Steve"
							description="Your first name"
							error={errors.first_name}
						/>
						<Input
							type={'text'}
							name="last_name"
							placeholder="Pastrami"
							description="Your last name"
							error={errors.last_name}
						/>
						<Input
							type={'password'}
							name="password"
							placeholder="************"
							description="The password you registered with"
							error={errors.password}
						/>
						<Submit value="Submit" />
					</Wrapper>
				)}
			</Formik>
		</PageWrapper>
	)
}

export default Register
