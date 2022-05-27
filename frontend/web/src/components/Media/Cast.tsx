import React from 'react'
import styled from 'styled-components'
import { Cast } from '../../generated/graphql'

const CastRowWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`

const CastTitle = styled.span`
	font-size: 15px;
	font-weight: 700;
	margin-bottom: 10px;
`

const CastWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	overflow-x: scroll;

	scrollbar-width: none;
	-ms-overflow-style: -ms-autohiding-scrollbar;

	&::-webkit-scrollbar {
		display: none;
	}

	& > :not(:last-child) {
		margin-right: 5px;
	}
`

const Cast = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;

	&:hover {
		cursor: pointer;
	}
`

const CastImage = styled.div<{ src: string }>`
	height: calc(12.5vw - 5px);
	width: calc(12.5vw - 5px);

	background-image: url(${(props) => props.src});
	background-color: pink;
	background-size: cover;

	margin-bottom: 5px;
`

const CastName = styled.span`
	font-size: 13px;
	font-weight: 700;
	color: #000000;
	margin-bottom: 5px;
`

const CastRole = styled.span`
	font-size: 13px;
	font-weight: 400;
	color: #000000;
`

interface CastRowProps {
	casts: Array<Cast>
}

export const CastRow: React.FC<CastRowProps> = ({ casts }) => {
	return (
		<CastRowWrapper>
			<CastTitle>Cast & Crew</CastTitle>
			<CastWrapper>
				{casts.map((x) => (
					<Cast key={x.id}>
						<CastImage
							src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${x.person?.id}/profile1.jpg`}
						/>
						<CastName>{x.person?.name}</CastName>
						<CastRole>{x.role}</CastRole>
					</Cast>
				))}
			</CastWrapper>
		</CastRowWrapper>
	)
}
