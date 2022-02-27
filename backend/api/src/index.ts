import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection, getConnectionOptions } from 'typeorm'
import { HelloWorldResolver } from './resolvers/HelloWorldResolver'

const main = async () => {
	const app = express()

	const options = await getConnectionOptions(
		process.env.NODE_ENV || 'development'
	)
	await createConnection({ ...options, name: 'default' })

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloWorldResolver],
			validate: true,
		}),
	})

	apolloServer.applyMiddleware({ app, cors: false })
	const port = process.env.PORT || 4000
	app.listen(port, () => {
		console.log(`api is listening at http://localhost:${port}/graphql...`)
	})
}

main()
