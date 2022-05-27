import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {
	GetIsWatchlistDocument,
	Media,
	SourceType,
	useGetIsWatchlistQuery,
	useGetSourceByMediaQuery,
	useToggleWatchlistMutation,
} from '../../generated/graphql'

const Nav = styled.nav`
	height: 40px;
	width: 100%;
	background-color: #ffffff;
	position: fixed;
	top: 40px;
	left: 0;
	z-index: 100;
`

const NavbarWrapper = styled.div`
	height: 100%;
	width: calc(100% - 80px);
	margin: 0 40px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const NavbarLinkWrapper = styled.div<{ align: string }>`
	display: flex;
	flex-direction: row;
	justify-content: ${(props) => props.align};
	align-items: baseline;
	width: 40%;

	& :not(:last-child) {
		margin-right: 20px;
	}
`

const NavbarTitle = styled.a`
	font-size: 25px;
	font-weight: 700;
	font-family: 'Roboto', sans-serif;
	color: #1f1f1f;
	text-decoration: none;
`

const NavbarSubtitle = styled.a`
	font-size: 15px;
	font-weight: 700;
	color: #3c3c3c;
	text-decoration: none;
`

const NavbarLink = styled.a`
	font-size: 15px;
	font-weight: 700;
	color: #1f1f1f;
	text-decoration: none;
`

interface NavbarProps {
	data: Media
	subtitle?: string
}

export const Navbar: React.FC<NavbarProps> = ({ data, subtitle }) => {
	const { loading: sourceLoading, data: sourceData } = useGetSourceByMediaQuery(
		{
			variables: {
				options: {
					mediaId: data.id,
					type: SourceType.Movie,
				},
			},
		}
	)

	const { loading: watchlistLoading, data: watchlistData } =
		useGetIsWatchlistQuery({
			variables: {
				options: {
					mediaId: data.id,
				},
			},
		})

	const [toggleWatchlist] = useToggleWatchlistMutation()

	return (
		<Nav>
			<NavbarWrapper>
				<NavbarLinkWrapper align="left">
					<Link href={`/media/${data.url}`} passHref>
						<NavbarTitle>{data.title}</NavbarTitle>
					</Link>
					{!!subtitle && <NavbarSubtitle>{subtitle}</NavbarSubtitle>}
				</NavbarLinkWrapper>
				<NavbarLinkWrapper align="right">
					{data.isAvailable ? (
						<>
							{!sourceLoading && sourceData && sourceData.getSourceByMedia ? (
								<>
									{sourceData.getSourceByMedia === null ||
									sourceData.getSourceByMedia.length === 0 ? (
										<NavbarLink>Unavailable</NavbarLink>
									) : (
										<Link
											href={`/player/${sourceData?.getSourceByMedia[0].id}?from=/media/${data.url}`}
											passHref
										>
											<NavbarLink>Play Movie</NavbarLink>
										</Link>
									)}
								</>
							) : (
								<NavbarLink>Loading</NavbarLink>
							)}
						</>
					) : (
						<NavbarLink>
							Available from {moment(data.available_from).format('DD MMMM')}
						</NavbarLink>
					)}

					{!watchlistLoading && watchlistData ? (
						<>
							{watchlistData.isWatchlist === true ? (
								<NavbarLink
									onClick={async () => {
										await toggleWatchlist({
											variables: {
												options: {
													mediaId: data.id,
												},
											},
											refetchQueries: [GetIsWatchlistDocument],
										})
									}}
								>
									Remove from Watchlist
								</NavbarLink>
							) : (
								<NavbarLink
									onClick={async () => {
										await toggleWatchlist({
											variables: {
												options: {
													mediaId: data.id,
												},
											},
											refetchQueries: [GetIsWatchlistDocument],
										})
									}}
								>
									Add to Watchlist
								</NavbarLink>
							)}
						</>
					) : (
						<NavbarLink>Loading</NavbarLink>
					)}
				</NavbarLinkWrapper>
			</NavbarWrapper>
		</Nav>
	)
}
