import argon2 from 'argon2'
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql'
import {
	getUserByEmailInput,
	LoginInput,
	PermissionInput,
	RegisterInput,
	User,
} from '../entities/User'
import { isAdmin } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'
import { Context } from '../types/Context'

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() ctx: Context): Promise<User | null> {
		const userId = ctx.req.session.userId
		if (!userId) {
			return null
		}
		const user = await User.findOne({ id: userId })
		if (!user) {
			return null
		}
		return user
	}

	@Mutation(() => User, { nullable: true })
	async login(
		@Arg('options', () => LoginInput) options: LoginInput,
		@Ctx() ctx: Context
	): Promise<User | null> {
		const user = await User.findOne({ where: { email: options.email } })
		if (!user) {
			return null
		}

		const isMatch = await argon2.verify(user.password, options.password)
		if (!isMatch) {
			return null
		}

		ctx.req.session.userId = user.id
		return user
	}

	@Mutation(() => User, { nullable: true })
	async register(
		@Arg('options', () => RegisterInput) options: RegisterInput
	): Promise<User | null> {
		const hashedPassword = await argon2.hash(options.password)

		try {
			const user = await User.create({
				...options,
				password: hashedPassword,
			}).save()

			return user
		} catch (e) {
			console.log(e)
			return null
		}
	}

	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: Context): Promise<Boolean> {
		return new Promise((res, rej) => {
			ctx.req.session.destroy((err) => {
				if (err) {
					console.log(err)
					return rej(false)
				}

				ctx.res.clearCookie('lfilm_qid')
				return res(true)
			})
		})
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth, isAdmin)
	async addPermission(
		@Arg('options', () => PermissionInput) options: PermissionInput
	): Promise<Boolean> {
		const user = await User.findOne({ where: { id: options.id } })
		if (!user) {
			return false
		}
		user.roles.push(options.permission)
		await User.update({ id: user.id }, { roles: user.roles })
		return true
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth, isAdmin)
	async removePermission(
		@Arg('options', () => PermissionInput) options: PermissionInput
	): Promise<Boolean> {
		const user = await User.findOne({ where: { id: options.id } })
		if (!user) {
			return false
		}
		const index = user.roles.indexOf(options.permission)
		if (index > -1) {
			user.roles.splice(index, 1)
		}
		await User.update({ id: user.id }, { roles: user.roles })
		return true
	}

	@Query(() => User, { nullable: true })
	@UseMiddleware(isAuth)
	async getUserByEmail(
		@Arg('options', () => getUserByEmailInput) options: getUserByEmailInput
	): Promise<User | null> {
		const user = await User.findOne({ where: { email: options.email } })
		if (!user) {
			return null
		}
		return user
	}
}
