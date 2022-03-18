import type { NextPage } from 'next'
import styled from 'styled-components'

const WelcomeWrapper = styled.div`
	background-color: #1f1f1f;
	background-image: url('/welcome_background.png');
	background-size: cover;
	height: 100vh;
	width: 100%;
`

const WelcomeText = styled.h1`
	font-family: 'Inter', sans-serif;
	font-weight: 400;
	color: #ffffff;
	position: absolute;
	top: 50%;
	left: 50%;
	margin: 0;
	transform: translateX(-50%) translateY(-50%);
`

const LogoText = styled.span`
	font-weight: 700;
`

const Welcome: NextPage = () => {
	return (
		<WelcomeWrapper>
			<WelcomeText>
				Welcome to <LogoText>Luni Film</LogoText>
			</WelcomeText>
		</WelcomeWrapper>
	)
}

export default Welcome
