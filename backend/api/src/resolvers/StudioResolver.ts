import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql'
import { MediaStudio } from '../entities/MediaStudio'
import { GetStudioByUrlInput, Studio, StudioInput } from '../entities/Studio'
import { isEditor } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'

@Resolver(Studio)
export class StudioResolver {
	@FieldResolver(() => [MediaStudio])
	async medias(@Root() parent: Studio): Promise<MediaStudio[]> {
		const mediastudios = await MediaStudio.find({
			where: { studioId: parent.id },
		})
		return mediastudios
	}

	@Query(() => Studio, { nullable: true })
	async getStudioByUrl(
		@Arg('options', () => GetStudioByUrlInput) options: GetStudioByUrlInput
	): Promise<Studio | null> {
		const studio = await Studio.findOne({ where: { url: options.url } })
		if (!studio) {
			return null
		}
		return studio
	}

	@Query(() => [Studio])
	async getAllStudio(): Promise<Studio[]> {
		const studios = await Studio.find()
		return studios
	}

	@Mutation(() => Studio)
	@UseMiddleware(isAuth, isEditor)
	async createStudio(
		@Arg('options', () => StudioInput) options: StudioInput
	): Promise<Studio> {
		const studio = await Studio.create(options).save()
		return studio
	}
}
