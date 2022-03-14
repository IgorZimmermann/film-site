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
import { GetPersonByUrlInput, Person, PersonInput } from '../entities/Person'
import { isEditor } from '../middlewares/hasPermission'
import { isAuth } from '../middlewares/isAuth'

@Resolver(Person)
export class PersonResolver {
	@FieldResolver(() => [Cast])
	async casts(@Root() parent: Person): Promise<Cast[]> {
		const casts = await Cast.find({ where: { personId: parent.id } })
		return casts
	}

	@Query(() => Person, { nullable: true })
	async getPersonByUrl(
		@Arg('options', () => GetPersonByUrlInput) options: GetPersonByUrlInput
	): Promise<Person | null> {
		const person = await Person.findOne({ where: { url: options.url } })
		if (!person) {
			return null
		}
		return person
	}

	@Query(() => [Person])
	async getAllPerson(): Promise<Person[]> {
		const persons = await Person.find()
		return persons
	}

	@Mutation(() => Person)
	@UseMiddleware(isAuth, isEditor)
	async createPerson(
		@Arg('options', () => PersonInput) options: PersonInput
	): Promise<Person> {
		const person = await Person.create(options).save()
		return person
	}
}
