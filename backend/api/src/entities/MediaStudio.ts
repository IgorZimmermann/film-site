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
export class MediaStudio extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column('text')
	studioId: string

	@Column('text')
	mediaId: string
}

@InputType()
export class MediaStudioInput {
	@Field(() => ID)
	studioId: string

	@Field(() => ID)
	mediaId: string
}
