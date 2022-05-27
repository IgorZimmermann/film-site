import React from 'react'
import styled from 'styled-components'
import { Media } from '../../generated/graphql'

const StorylineRowWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`

const StorylineTitle = styled.span`
	font-size: 15px;
	font-weight: 700;
	margin-bottom: 10px;
`

const StorylineText = styled.p`
	font-size: 15px;
	font-weight: 400;
	width: 60vw;
	margin: 0;
`

interface StorylineProps {
	data: Media
}

export const Storyline: React.FC<StorylineProps> = ({ data }) => {
	return (
		<StorylineRowWrapper>
			<StorylineTitle>Storyline</StorylineTitle>
			<StorylineText>{data.overview}</StorylineText>
		</StorylineRowWrapper>
	)
}
