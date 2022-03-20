import type { NextPage } from 'next'
import NextLink from 'next/link'
import styled from 'styled-components'
import { PageWrapper } from '../components/PageWrapper'

const WelcomeWrapper = styled.div`
	background-color: #1f1f1f;
	background-image: url('/images/welcome_background.png');
	background-size: cover;
	height: 100vh;
	width: 100%;
`

const WelcomeTextWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	text-align: center;
`

const WelcomeText = styled.h1`
	font-family: 'Inter', sans-serif;
	font-weight: 400;
	font-size: 40px;
	color: #ffffff;
	margin: 0;
	margin-bottom: 120px;
`

const LogoText = styled.span`
	font-weight: 700;
`

const WelcomeButtonWrapper = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	grid-column-gap: 30px;
`

const WelcomeButton = styled.a`
	font-family: 'Inter', sans-serif;
	font-weight: 600;
	color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#1f1f1f')};
	background-color: ${(props) =>
		props.theme === 'dark' ? '#1f1f1f' : '#ffffff'};
	font-size: 20px;
	padding: 20px 90px;
	text-decoration: none;
`

const Welcome: NextPage = () => {
	return (
		<PageWrapper title="Welcome | Luni Film">
			<WelcomeWrapper>
				<WelcomeTextWrapper>
					<WelcomeText>
						Welcome to <LogoText>Luni Film</LogoText>
					</WelcomeText>
					<WelcomeButtonWrapper>
						<NextLink href={'/auth/login'} passHref={true}>
							<WelcomeButton theme={'light'}>Login</WelcomeButton>
						</NextLink>
						<NextLink href={'/auth/register'} passHref={true}>
							<WelcomeButton theme={'dark'} href="/auth/register">
								Register
							</WelcomeButton>
						</NextLink>
					</WelcomeButtonWrapper>
				</WelcomeTextWrapper>
			</WelcomeWrapper>
		</PageWrapper>
	)
}

export default Welcome
