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
	Collection,
	CollectionInput,
	getCollectionByIdInput,
} from '../entities/Collection'
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

	@Query(() => Collection, { nullable: true })
	async getCollectionById(
		@Arg('options', () => getCollectionByIdInput)
		options: getCollectionByIdInput
	) {
		const collection = await Collection.findOne({ where: { id: options.id } })
		if (!collection) {
			return null
		}
		return collection
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
