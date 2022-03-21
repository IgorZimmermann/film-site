import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql'
import { Cast } from '../entities/Cast'
import {
	getMediaByIdInput,
	getMediaByUrlInput,
	Media,
	MediaInput,
} from '../entities/Media'
import { MediaStudio } from '../entities/MediaStudio'
import { isEditor } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'

@Resolver(Media)
export class MediaResolver {
	@FieldResolver(() => [Cast])
	async casts(@Root() parent: Media): Promise<Cast[]> {
		const casts = await Cast.find({ where: { mediaId: parent.id } })
		return casts
	}

	@FieldResolver(() => [MediaStudio])
	async studios(@Root() parent: Media): Promise<MediaStudio[]> {
		const mediastudios = await MediaStudio.find({
			where: { mediaId: parent.id },
		})
		return mediastudios
	}

	@Query(() => Media, { nullable: true })
	async getMediaByUrl(
		@Arg('options', () => getMediaByUrlInput) options: getMediaByUrlInput
	): Promise<Media | null> {
		const media = await Media.findOne({ where: { url: options.url } })
		if (!media) {
			return null
		}
		return media
	}

	@Query(() => Media, { nullable: true })
	async getMediaById(
		@Arg('options', () => getMediaByIdInput) options: getMediaByIdInput
	): Promise<Media | null> {
		const media = await Media.findOne({ where: { id: options.id } })
		if (!media) {
			return null
		}
		return media
	}

	@Query(() => [Media])
	async getAllMedia(): Promise<Media[]> {
		const medias = await Media.find()
		return medias
	}

	@Mutation(() => Media)
	@UseMiddleware(isAuth, isEditor)
	async createMedia(
		@Arg('options', () => MediaInput) options: MediaInput
	): Promise<Media> {
		const media = await Media.create(options).save()
		return media
	}
}
