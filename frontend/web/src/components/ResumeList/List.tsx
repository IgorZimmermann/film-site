import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { useGetProgressQuery } from '../../generated/graphql'

const ResumeListWrapper = styled.div`
	margin-top: 25px;
	display: flex;
	flex-direction: column;
`

const ResumeListTitle = styled.h2`
	font-size: 15px;
	font-weight: 700;
	margin-bottom: 10px;
`

const ResumeListRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	overflow-x: scroll;

	scrollbar-width: none;
	-ms-overflow-style: -ms-autohiding-scrollbar;

	&::-webkit-scrollbar {
		display: none;
	}

	& :not(:last-child) {
		margin-right: 10px;
	}
`

const Media = styled.div<{ src: string; progress: number }>`
	height: calc((25vw - (160px / 4) - (30px / 4)) / 16 * 9);
	min-width: calc(25vw - (160px / 4) - (30px / 4));

	background-image: url(${(props) => props.src});
	background-size: cover;

	position: relative;

	&::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: ${(props) => (100 - props.progress).toString()}%;
		background-color: #ffffffbf;
	}

	&:hover {
		cursor: pointer;
	}
`

interface ListProps {}

export const ResumeList: React.FC<ListProps> = ({}) => {
	const { loading, data } = useGetProgressQuery()

	return (
		<ResumeListWrapper>
			<ResumeListTitle>Resume</ResumeListTitle>
			{!loading && data && data.getProgress ? (
				<ResumeListRow>
					{data.getProgress.map((x) => (
						<Link
							key={x.id}
							href={`/player/${x.mediaSource.id}?from=/`}
							passHref
						>
							<Media
								src={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/${x.mediaSource.mediaId}/${x.mediaSource.thumbnail}`}
								progress={(x.progress / x.duration) * 100}
							/>
						</Link>
					))}
				</ResumeListRow>
			) : null}
		</ResumeListWrapper>
	)
}
