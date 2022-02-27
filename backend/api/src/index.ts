import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import express from 'express'
import session from 'express-session'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection, getConnectionOptions } from 'typeorm'
import { redis } from './redis'
import { HelloWorldResolver } from './resolvers/HelloWorldResolver'
import { UserResolver } from './resolvers/UserResolver'
import { Context } from './types/Context'

const main = async () => {
	const app = express()

	const options = await getConnectionOptions(
		process.env.NODE_ENV || 'development'
	)
	await createConnection({ ...options, name: 'default' })

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloWorldResolver, UserResolver],
			validate: true,
		}),
		context: ({ req, res }: Context) => ({ req, res }),
	})

	const RedisStore = connectRedis(session)

	app.use(
		session({
			store: new RedisStore({
				client: redis as any,
			}),
			name: 'lfilm_qid',
			secret: process.env.SESSION_SECRET!,
			resave: false,
			saveUninitialized: false,
			cookie: {
				domain:
					process.env.NODE_ENV === 'production' ? '.byluni.com' : undefined,
				httpOnly: true,
				secure: false,
				maxAge: 1000 * 60 * 60 * 24 * 5 * 365, // 5 years
			},
		})
	)

	apolloServer.applyMiddleware({ app, cors: false })
	const port = process.env.PORT || 4000
	app.listen(port, () => {
		console.log(`api is listening at http://localhost:${port}/graphql...`)
	})
}

main()
