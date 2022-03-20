import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	const client = new ApolloClient({
		uri: process.env.API_URI || 'http://localhost:4000/graphql',
		cache: new InMemoryCache(),
		credentials: 'include',
	})

	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
