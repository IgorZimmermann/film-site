import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class MediaCollection extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column('text')
	collectionId: string

	@Column('text')
	mediaId: string

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true })
	comment?: string
}

@InputType()
export class MediaCollectionInput {
	@Field(() => ID)
	collectionId: string

	@Field(() => ID)
	mediaId: string

	@Field(() => String, { nullable: true })
	comment?: string
}
