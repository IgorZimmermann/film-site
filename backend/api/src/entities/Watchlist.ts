import { Field, ID, InputType, ObjectType, Root } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Media } from './Media'

@ObjectType()
@Entity()
export class Watchlist extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Field(() => ID)
	@Column('text')
	mediaId: string

	@Field(() => ID)
	@Column('text')
	userId: string

	@Field(() => Media)
	async media(@Root() parent: Watchlist): Promise<Media | undefined> {
		const media = await Media.findOne({ where: { id: parent.mediaId } })
		return media
	}
}

@InputType()
export class WatchlistInput {
	@Field(() => ID)
	mediaId: string
}
