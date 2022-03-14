import {
	Arg,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql'
import { Collection, CollectionInput } from '../entities/Collection'
import { MediaCollection } from '../entities/MediaCollection'
import { isAdmin, isEditor } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'

@Resolver(Collection)
export class CollectionResolver {
	@FieldResolver(() => [MediaCollection], { nullable: true })
	async medias(@Root() parent: Collection): Promise<MediaCollection[] | null> {
		const mediaCollections = await MediaCollection.find({
			where: { collectionId: parent.id },
		})
		if (!mediaCollections) {
			return null
		}
		return mediaCollections
	}

	@Query(() => [Collection])
	@UseMiddleware(isAuth, isAdmin)
	async getAllCollection(): Promise<Collection[]> {
		const collections = Collection.find()
		return collections
	}

	@Mutation(() => Collection, { nullable: true })
	@UseMiddleware(isAuth, isEditor)
	async createCollection(
		@Arg('options', () => CollectionInput) options: CollectionInput
	): Promise<Collection | null> {
		const collection = await Collection.create(options).save()
		if (!collection) {
			return null
		}
		return collection
	}
}
