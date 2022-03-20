import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

const Body = styled.div`
	min-height: 100vh;
`

interface PageWrapperProps {
	title?: string
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
	children,
	title,
}) => {
	return (
		<>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
				<title>{title || 'Luni Film'}</title>

				<meta name="og:title" content={title || 'Luni Film'} />
				<meta
					name="og:image"
					content="https://film.byluni.com/welcome_background.jpg"
				/>
			</Head>
			<Body>{children}</Body>
		</>
	)
}
