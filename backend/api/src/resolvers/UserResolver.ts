import argon2 from 'argon2'
import {
	Arg,
	Ctx,
	Field,
	ID,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql'
import { Collection } from '../entities/Collection'
import { Media } from '../entities/Media'
import { IsProgressInput, Progress, ProgressInput } from '../entities/Progress'
import {
	getUserByEmailInput,
	LoginInput,
	PermissionInput,
	RegisterInput,
	User,
} from '../entities/User'
import { Watchlist, WatchlistInput } from '../entities/Watchlist'
import { isAdmin } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'
import { Context } from '../types/Context'

@ObjectType()
class Homepage {
	@Field(() => String)
	type: string

	@Field(() => ID)
	data: string
}

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

	@Query(() => [Homepage])
	@UseMiddleware(isAuth)
	async homepage(): Promise<Homepage[]> {
		const homepage: Homepage[] = []
		const medias = await Media.find({ where: { featured: true } })
		medias.forEach((x) => homepage.push({ type: 'media', data: x.id }))
		const collections = await Collection.find({ where: { featured: true } })
		collections.forEach((x) =>
			homepage.push({ type: 'collection', data: x.id })
		)
		homepage.splice(1, 0, { type: 'resume', data: '' })
		return homepage
	}

	@Query(() => [Watchlist])
	@UseMiddleware(isAuth)
	async getWatchlist(@Ctx() ctx: Context): Promise<Watchlist[]> {
		const userId = ctx.req.session.userId
		const watchlists = await Watchlist.find({ where: { userId: userId } })
		return watchlists
	}

	@Query(() => Boolean)
	@UseMiddleware(isAuth)
	async isWatchlist(
		@Arg('options', () => WatchlistInput) options: WatchlistInput,
		@Ctx() ctx: Context
	): Promise<boolean> {
		const userId = ctx.req.session.userId
		const watchlist = await Watchlist.findOne({
			where: { userId, mediaId: options.mediaId },
		})
		if (watchlist) {
			return true
		} else {
			return false
		}
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async toggleWatchlist(
		@Arg('options', () => WatchlistInput) options: WatchlistInput,
		@Ctx() ctx: Context
	): Promise<boolean> {
		const userId = ctx.req.session.userId
		const watchlistExists = await Watchlist.findOne({
			where: { userId, mediaId: options.mediaId },
		})
		if (watchlistExists) {
			await watchlistExists.remove()
			return false
		} else {
			await Watchlist.create({
				mediaId: options.mediaId,
				userId: userId,
			}).save()
			return true
		}
	}

	@Query(() => [Progress])
	async getProgress(@Ctx() ctx: Context): Promise<Progress[]> {
		const userId = ctx.req.session.userId
		const progress = await Progress.find({ where: { userId } })
		return progress
	}

	@Query(() => Progress, { nullable: true })
	async isProgress(
		@Arg('options', () => IsProgressInput) options: IsProgressInput,
		@Ctx() ctx: Context
	): Promise<Progress | null> {
		const userId = ctx.req.session.userId
		const progress = await Progress.findOne({
			where: { userId, mediaSourceId: options.mediaSourceId },
		})
		if (progress) {
			return progress
		} else {
			return null
		}
	}

	@Mutation(() => Progress)
	async updateProgress(
		@Arg('options', () => ProgressInput) options: ProgressInput,
		@Ctx() ctx: Context
	): Promise<Progress> {
		const userId = ctx.req.session.userId
		let progress = await Progress.findOne({
			where: { userId, mediaSourceId: options.mediaSourceId },
		})
		if (progress) {
			await Progress.update({ id: progress.id }, { ...options })
			progress = await Progress.findOne({
				where: { userId, mediaSourceId: options.mediaSourceId },
			})
			return progress!
		} else {
			progress = await Progress.create({ ...options, userId }).save()
			return progress
		}
	}
}
