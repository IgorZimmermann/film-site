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
export class SubtitleSource extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column('text')
	mediaId: string

	@Field(() => String)
	@Column('text')
	src: string

	@Field(() => String)
	@Column('text')
	lang: string

	@Field(() => String)
	@Column('text')
	language: string
}

@InputType()
export class SubtitleSourceInput {
	@Field(() => String)
	mediaId: string

	@Field(() => String)
	src: string

	@Field(() => String)
	lang: string

	@Field(() => String)
	language: string
}
