import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

/*
Table Cast {
  id text [pk, unique]
  updatedAt date
  createdAt date
  personid text [ref: > Person.id]
  mediaid text [ref: < Media.id]
  role text
}
*/

@ObjectType()
@Entity()
export class Cast extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column('text')
	personId: string

	@Column('text')
	mediaId: string

	@Field(() => String)
	@Column('text')
	role: string
}

@InputType()
export class CastInput {
	@Field(() => ID)
	personId: string

	@Field(() => ID)
	mediaId: string

	@Field(() => String)
	role: string
}
