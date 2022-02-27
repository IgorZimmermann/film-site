module.exports = [
	{
		name: 'development',
		type: 'postgres',
		url: process.env.DATABASE_URL,
		synchronize: true,
		logging: true,
		entities: ['src/entities/**/*.ts'],
		migrations: ['src/migrations/**/*.ts'],
		subscribers: ['src/subscribers/**/*.ts'],
		cli: {
			entitiesDir: 'src/entities',
			migrationsDir: 'src/migrations',
			subscribersDir: 'src/subscribers',
		},
	},
	{
		name: 'production',
		type: 'postgres',
		url: process.env.DATABASE_URL,
		synchronize: false,
		logging: false,
		entities: ['dist/entities/**/*.js'],
		migrations: ['dist/migrations/**/*.js'],
		subscribers: ['dist/subscribers/**/*.js'],
		cli: {
			entitiesDir: 'dist/entities',
			migrationsDir: 'dist/migrations',
			subscribersDir: 'dist/subscribers',
		},
	},
]
