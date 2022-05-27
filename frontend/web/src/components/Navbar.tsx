import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useMeQuery } from '../generated/graphql'

const Nav = styled.nav`
	height: 40px;
	width: 100%;
	background-color: #ffffff;
	position: fixed;
	top: 0;
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
	align-items: center;
	width: 40%;

	& :not(:last-child) {
		margin-right: 10px;
	}
`

const NavbarLink = styled.a<{ selected: boolean }>`
	font-size: 15px;
	font-weight: ${(props) => props.selected && '700'};
	color: #1f1f1f;
	text-decoration: none;
`

const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20%;
`

const Logo = styled.a`
	width: 35px;
	height: 35px;
	background-image: url('${process.env.NEXT_PUBLIC_CONTENT_SRC}/logo.svg');
	background-position: center;
	background-repeat: no-repeat;
`

const User = styled.span`
	font-size: 15px;
	font-weight: 400;
	text-transform: lowercase;
	color: #1f1f1f;
`

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
	const router = useRouter()
	const { loading, data } = useMeQuery()

	return (
		<Nav>
			<NavbarWrapper>
				<NavbarLinkWrapper align="left">
					<Link href={'/'} passHref={true}>
						<NavbarLink selected={router.pathname === '/'}>Home</NavbarLink>
					</Link>
					<Link href={'/watchlist'} passHref={true}>
						<NavbarLink selected={router.pathname === '/watchlist'}>
							Watchlist
						</NavbarLink>
					</Link>
				</NavbarLinkWrapper>
				<LogoWrapper>
					<Link href={'/'} passHref={true}>
						<Logo />
					</Link>
				</LogoWrapper>
				<NavbarLinkWrapper align="right">
					{!loading && data && data.me && <User>{data.me.first_name}</User>}
				</NavbarLinkWrapper>
			</NavbarWrapper>
		</Nav>
	)
}
