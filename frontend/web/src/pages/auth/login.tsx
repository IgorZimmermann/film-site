import { Formik } from 'formik'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Input } from '../../components/Form/Input'
import { Submit } from '../../components/Form/Submit'
import { Wrapper } from '../../components/Form/Wrapper'
import { PageWrapper } from '../../components/PageWrapper'
import { useLoginMutation } from '../../generated/graphql'

const Login: NextPage = () => {
	const router = useRouter()
	const [login] = useLoginMutation()
	return (
		<PageWrapper title="Login | Luni Film">
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					try {
						const response = await login({
							variables: {
								options: {
									email: values.email,
									password: values.password,
								},
							},
						})
						if (response.data?.login === null || !response.data?.login) {
							setErrors({
								email: 'Invalid email or password',
								password: 'Invalid email or password',
							})
						} else {
							router.push('/')
						}
					} catch (err: any) {
						const errors: { [key: string]: string } = {}
						err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
							(validationErr: any) => {
								Object.values(validationErr.constraints).forEach(
									(message: any) => {
										errors[validationErr.property] = message
									}
								)
							}
						)
						setErrors(errors)
					}
				}}
			>
				{({ errors }) => (
					<Wrapper title="Login">
						<Input
							type={'email'}
							name="email"
							placeholder="steve@byluni.com"
							description="The email you registered with"
							error={errors.email}
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

export default Login
