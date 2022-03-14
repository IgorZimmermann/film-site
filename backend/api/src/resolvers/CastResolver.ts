import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql'
import { Cast, CastInput } from '../entities/Cast'
import { Media } from '../entities/Media'
import { Person } from '../entities/Person'
import { isAdmin, isEditor } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'

@Resolver(Cast)
export class CastResolver {
	@FieldResolver(() => Person, { nullable: true })
	async person(@Root() parent: Cast): Promise<Person | null> {
		const person = await Person.findOne({ where: { id: parent.personId } })
		if (!person) {
			return null
		}
		return person
	}

	@FieldResolver(() => Media, { nullable: true })
	async media(@Root() parent: Cast): Promise<Media | null> {
		const media = await Media.findOne({ where: { id: parent.mediaId } })
		if (!media) {
			return null
		}
		return media
	}

	@Query(() => [Cast])
	@UseMiddleware(isAuth, isAdmin)
	async getAllCast(): Promise<Cast[]> {
		const casts = Cast.find()
		return casts
	}

	@Mutation(() => Cast, { nullable: true })
	@UseMiddleware(isAuth, isEditor)
	async createCast(
		@Arg('options', () => CastInput) options: CastInput
	): Promise<Cast | null> {
		const cast = await Cast.create(options).save()
		if (!cast) {
			return null
		}
		return cast
	}
}
