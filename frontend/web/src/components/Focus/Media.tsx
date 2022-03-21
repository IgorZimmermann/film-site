import React from 'react'
import styled from 'styled-components'
import { useGetMediaByIdQuery } from '../../generated/graphql'
import { Content } from './Content'

const MetaWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	bottom: 40px;
	left: 40px;
	width: 450px;
`

const MetaGradient = styled.div`
	height: 100%;
	width: 100%;
	background: linear-gradient(
		180deg,
		#00000000 0%,
		#000000cc 90%,
		#000000 100%
	);
`

const MetaTitle = styled.div<{ src: string }>`
	display: block;
	height: 170px;
	width: 100%;
	margin-bottom: 15px;

	background-image: url(${(props) => props.src});
	background-size: contain;
	background-position: left bottom;
	background-repeat: no-repeat;
`

const MetaTagline = styled.p`
	font-size: 16px;
	font-weight: 400;
	font-family: 'Inter', sans-serif;
	color: #ffffff;
	margin: 0;
	margin-bottom: 15px;
`

const MetaButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 15px;

	& :not(:last-of-type) {
		margin-right: 25px;
	}
`

const MetaButton = styled.a`
	font-size: 15px;
	font-weight: 600;
	font-family: 'Inter', sans-serif;
	color: ${(props) => (props.theme === 'light' ? '#1f1f1f' : '#ffffff')};
	background-color: ${(props) =>
		props.theme === 'light' ? '#ffffff' : '#00000059'};
	width: 45%;
	padding: 15px 0;
	text-align: center;
`

interface MediaProps {
	id: string
}

export const Media: React.FC<MediaProps> = ({ id }) => {
	const { data, loading } = useGetMediaByIdQuery({
		variables: {
			options: {
				id,
			},
		},
	})
	return (
		<div>
			{loading && !data ? (
				<span>loading</span>
			) : (
				<Content
					img={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${id}/cover1.jpg`}
				>
					<MetaGradient>
						<MetaWrapper>
							<MetaTitle
								src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${id}/title.png`}
							/>
							<MetaTagline>{data?.getMediaById?.tagline}</MetaTagline>
							<MetaButtonWrapper>
								<MetaButton theme={'light'}>Play Movie</MetaButton>
								<MetaButton>More Info</MetaButton>
							</MetaButtonWrapper>
						</MetaWrapper>
					</MetaGradient>
				</Content>
			)}
		</div>
	)
}
