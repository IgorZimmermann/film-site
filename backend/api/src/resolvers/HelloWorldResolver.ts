import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloWorldResolver {
	@Query(() => String)
	hello(): String {
		return 'hi'
	}
}
