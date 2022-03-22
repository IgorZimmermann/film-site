import type { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import { PageWrapper } from '../components/PageWrapper'

const ErrorPageWrapper = styled.div`
	height: 100vh;
	width: 100%;
	background-color: #1f1f1f;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-left: 50px;
`

const ErrorText = styled.h1`
	font-size: 150px;
	font-weight: 700;
	font-family: 'JetBrains Mono', monospace;
	color: #ffffff;
	margin: 0;
`

const MetaButton = styled.a`
	font-size: 15px;
	font-weight: 600;
	font-family: 'Inter', sans-serif;
	color: ${(props) => (props.theme === 'light' ? '#1f1f1f' : '#ffffff')};
	background-color: ${(props) =>
		props.theme === 'light' ? '#ffffff' : '#00000059'};
	padding: 15px 50px 15px 50px;
	text-align: center;
	text-decoration: none;
`

const ErrorVideo = styled.video`
	margin-right: 50px;
	width: 60vw;
	height: calc(60vw / 16 * 9);
`

const ErrorVideoCaption = styled.p`
	font-size: 13px;
	font-weight: 400;
	font-family: 'Inter', sans-serif;
	color: #ffffff;
	position: absolute;
	bottom: 5px;
	right: 50px;

	& a {
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}
`

const Custom404: NextPage = () => {
	return (
		<PageWrapper title={'404 | Luni Film'}>
			<ErrorPageWrapper>
				<ErrorWrapper>
					<ErrorText>404</ErrorText>
					<Link href={'/'} passHref={true}>
						<MetaButton theme={'light'}>Back to home</MetaButton>
					</Link>
				</ErrorWrapper>
				<ErrorVideo
					src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/clips/404_1.mp4`}
					controls
				/>
			</ErrorPageWrapper>
			<ErrorVideoCaption>
				Clip from:{' '}
				<Link href={'/movie/the-social-network'} passHref={true}>
					<a>The Social Network</a>
				</Link>
			</ErrorVideoCaption>
		</PageWrapper>
	)
}

export default Custom404
