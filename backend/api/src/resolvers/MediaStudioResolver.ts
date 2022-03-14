import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql'
import { Media } from '../entities/Media'
import { MediaStudio, MediaStudioInput } from '../entities/MediaStudio'
import { Studio } from '../entities/Studio'
import { isAdmin, isEditor } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'

@Resolver(MediaStudio)
export class MediaStudioResolver {
	@FieldResolver(() => Studio, { nullable: true })
	async studio(@Root() parent: MediaStudio): Promise<Studio | null> {
		const studio = await Studio.findOne({ where: { id: parent.studioId } })
		if (!studio) {
			return null
		}
		return studio
	}

	@FieldResolver(() => Media, { nullable: true })
	async media(@Root() parent: MediaStudio): Promise<Media | null> {
		const media = await Media.findOne({ where: { id: parent.mediaId } })
		if (!media) {
			return null
		}
		return media
	}

	@Query(() => [MediaStudio])
	@UseMiddleware(isAuth, isAdmin)
	async getAllMediaStudio(): Promise<MediaStudio[]> {
		const mediaStudios = await MediaStudio.find()
		return mediaStudios
	}

	@Mutation(() => MediaStudio, { nullable: true })
	@UseMiddleware(isAuth, isEditor)
	async createMediaStudio(
		@Arg('options', () => MediaStudioInput) options: MediaStudioInput
	): Promise<MediaStudio | null> {
		const mediaStudio = await MediaStudio.create(options).save()
		if (!mediaStudio) {
			return null
		}
		return mediaStudio
	}
}
