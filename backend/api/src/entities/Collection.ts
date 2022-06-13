import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { MediaCollection } from './MediaCollection'

@ObjectType()
@Entity()
export class Collection extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Field(() => String)
	@Column('text')
	type: 'list' | 'comparison' | 'trilogy'

	@Field(() => String)
	@Column('text')
	title: string

	@Field(() => String)
	@Column('date')
	available_from: Date

	@Field(() => String)
	@Column('text')
	description: string

	@Field(() => Boolean)
	@Column('boolean', { default: false })
	featured: boolean

	@Field(() => [MediaCollection])
	medias: MediaCollection[]
}

@InputType()
export class CollectionInput {
	@Field(() => String)
	type: 'list' | 'comparison' | 'trilogy'

	@Field(() => String)
	title: string

	@Field(() => String)
	available_from: Date

	@Field(() => String)
	description: string
}

@InputType()
export class getCollectionByIdInput {
	@Field(() => String)
	id: string
}
