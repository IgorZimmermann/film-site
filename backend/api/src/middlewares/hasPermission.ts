import { MiddlewareFn } from 'type-graphql'
import { User } from '../entities/User'
import { Context } from '../types/Context'

export const isAdmin: MiddlewareFn<Context> = async (
	{ context: ctx },
	next
) => {
	const user = await User.findOne({ id: ctx.req.session.userId })
	if (!user?.roles.includes('A')) {
		throw new Error('user is not an admin')
	}

	return next()
}

export const isEditor: MiddlewareFn<Context> = async (
	{ context: ctx },
	next
) => {
	const user = await User.findOne({ id: ctx.req.session.userId })
	if (!user?.roles.includes('E') && !user?.roles.includes('A')) {
		throw new Error('user is not an editor')
	}

	return next()
}
