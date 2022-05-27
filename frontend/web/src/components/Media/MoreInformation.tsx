import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Media } from '../../generated/graphql'

const MoreInformationRowWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`

const MoreInformationTitle = styled.span`
	font-size: 15px;
	font-weight: 700;
	margin-bottom: 10px;
`

const MoreInformationWrapper = styled.div`
	display: flex;
	flex-direction: row;

	& > :not(:last-child) {
		margin-right: 20px;
	}
`

const MoreInformationColumnWrapper = styled.div`
	width: 27vw;
	display: flex;
	flex-direction: column;

	& > :not(:last-child) {
		margin-bottom: 10px;
	}
`

const MoreInformationColumnRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const MoreInformationColumnKey = styled.span`
	font-size: 13px;
	font-weight: 700;
`

const MoreInformationColumnValue = styled.span`
	font-size: 13px;
	font-weight: 400;

	& > a {
		color: inherit;
		text-decoration: none;

		&:hover {
			font-weight: 600;
			text-decoration: underline;
		}

		&:not(:last-child)::after {
			content: ', ';
		}
	}
`

interface MoreInformationProps {
	data: Media
}

export const MoreInformation: React.FC<MoreInformationProps> = ({ data }) => {
	return (
		<MoreInformationRowWrapper>
			<MoreInformationTitle>More Information</MoreInformationTitle>
			<MoreInformationWrapper>
				<MoreInformationColumnWrapper>
					<MoreInformationColumnRow>
						<MoreInformationColumnKey>Released</MoreInformationColumnKey>
						<MoreInformationColumnValue>
							{moment(data.release_date).format('DD MMM, YYYY')}
						</MoreInformationColumnValue>
					</MoreInformationColumnRow>
					<MoreInformationColumnRow>
						<MoreInformationColumnKey>Language</MoreInformationColumnKey>
						<MoreInformationColumnValue>
							{data.original_language}
						</MoreInformationColumnValue>
					</MoreInformationColumnRow>
					<MoreInformationColumnRow>
						<MoreInformationColumnKey>
							Country of Origin
						</MoreInformationColumnKey>
						<MoreInformationColumnValue>
							{data.country_of_origin}
						</MoreInformationColumnValue>
					</MoreInformationColumnRow>
					<MoreInformationColumnRow>
						<MoreInformationColumnKey>Studios</MoreInformationColumnKey>
						<MoreInformationColumnValue>
							{data.studios.map((x) => (
								<Link key={x.id} href={`/studio/${x.studio?.url}`} passHref>
									<a>{x.studio?.short_name}</a>
								</Link>
							))}
						</MoreInformationColumnValue>
					</MoreInformationColumnRow>
				</MoreInformationColumnWrapper>
				<MoreInformationColumnWrapper>
					<MoreInformationColumnRow>
						<MoreInformationColumnKey>Keywords</MoreInformationColumnKey>
						<MoreInformationColumnValue>
							{data.keywords.slice(0, 3).join(', ')}
							{', '}
							<Link href={`/media/${data.url}/keywords`} passHref>
								<a>more</a>
							</Link>
						</MoreInformationColumnValue>
					</MoreInformationColumnRow>
				</MoreInformationColumnWrapper>
			</MoreInformationWrapper>
		</MoreInformationRowWrapper>
	)
}
