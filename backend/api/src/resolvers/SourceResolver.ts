import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql'
import {
	GetSourceByIdInput,
	GetSourceByMediaInput,
	MediaSource,
	MediaSourceInput,
} from '../entities/MediaSource'
import { SubtitleSource, SubtitleSourceInput } from '../entities/SubtitleSource'
import { isEditor } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'

@Resolver(MediaSource)
export class SourceResolver {
	@FieldResolver(() => [SubtitleSource])
	async subtitles(@Root() parent: MediaSource): Promise<SubtitleSource[]> {
		const subtitles = await SubtitleSource.find({
			where: { mediaId: parent.id },
		})
		return subtitles
	}

	@Query(() => [MediaSource], { nullable: true })
	@UseMiddleware(isAuth)
	async getSourceByMedia(
		@Arg('options', () => GetSourceByMediaInput) options: GetSourceByMediaInput
	): Promise<MediaSource[] | null> {
		const mediasources = await MediaSource.find({
			where: { mediaId: options.mediaId, type: options.type },
		})
		if (!mediasources) return null
		return mediasources
	}

	@Query(() => MediaSource, { nullable: true })
	@UseMiddleware(isAuth)
	async getSourceById(
		@Arg('options', () => GetSourceByIdInput) options: GetSourceByIdInput
	): Promise<MediaSource | null> {
		const mediasource = await MediaSource.findOne({
			where: { id: options.id },
		})
		if (!mediasource) return null
		return mediasource
	}

	@Mutation(() => MediaSource)
	@UseMiddleware(isAuth, isEditor)
	async createMediaSource(
		@Arg('options', () => MediaSourceInput) options: MediaSourceInput
	): Promise<MediaSource> {
		const mediasource = await MediaSource.create(options).save()
		return mediasource
	}

	@Mutation(() => SubtitleSource)
	@UseMiddleware(isAuth, isEditor)
	async createSubtitleSource(
		@Arg('optioins', () => SubtitleSourceInput) options: SubtitleSourceInput
	): Promise<SubtitleSource> {
		const subtitlesource = await SubtitleSource.create(options).save()
		return subtitlesource
	}
}
