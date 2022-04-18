import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { Navbar } from './Navbar'

const Body = styled.div`
	min-height: 100vh;
	font-family: 'Roboto Condensed', sans-serif;
`

interface PageWrapperProps {
	title?: string
	navbar?: boolean
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
	children,
	title,
	navbar,
}) => {
	return (
		<>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/apple-touch-icon.png`}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/favicon-32x32.png`}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/favicon-16x16.png`}
				/>
				<link
					rel="manifest"
					href={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/site.webmanifest`}
				/>
				<link
					rel="mask-icon"
					href={`${process.env.NEXT_PUBLIC_CONTENT_SRC}/safari-pinned-tab.svg`}
					color="#ffffff"
				/>
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
				<title>{title + ' | Luni Film' || 'Luni Film'}</title>

				<meta name="og:title" content={title + ' | Luni Film' || 'Luni Film'} />
				<meta
					name="og:image"
					content="https://film.byluni.com/welcome_background.jpg"
				/>
			</Head>
			<Body>
				{navbar && <Navbar />}
				{children}
			</Body>
		</>
	)
}
