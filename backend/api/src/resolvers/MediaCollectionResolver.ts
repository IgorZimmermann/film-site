import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql'
import { Collection } from '../entities/Collection'
import { Media } from '../entities/Media'
import {
	MediaCollection,
	MediaCollectionInput,
} from '../entities/MediaCollection'
import { isAdmin, isEditor } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'

@Resolver(MediaCollection)
export class MediaCollectionResolver {
	@FieldResolver(() => Collection, { nullable: true })
	async collection(
		@Root() parent: MediaCollection
	): Promise<Collection | null> {
		const collection = await Collection.findOne({
			where: { id: parent.collectionId },
		})
		if (!collection) {
			return null
		}
		return collection
	}

	@FieldResolver(() => Media, { nullable: true })
	async media(@Root() parent: MediaCollection): Promise<Media | null> {
		const media = await Media.findOne({ where: { id: parent.mediaId } })
		if (!media) {
			return null
		}
		return media
	}

	@Query(() => [MediaCollection])
	@UseMiddleware(isAuth, isAdmin)
	async getAllMediaCollection(): Promise<MediaCollection[]> {
		const mediaCollections = await MediaCollection.find()
		return mediaCollections
	}

	@Mutation(() => MediaCollection, { nullable: true })
	@UseMiddleware(isAuth, isEditor)
	async createMediaCollection(
		@Arg('options', () => MediaCollectionInput) options: MediaCollectionInput
	): Promise<MediaCollection | null> {
		const mediaCollection = await MediaCollection.create(options).save()
		if (!mediaCollection) {
			return null
		}
		return mediaCollection
	}
}
