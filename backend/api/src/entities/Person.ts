import { IsDate, Length } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Cast } from './Cast'

/*
Table Person {
  id text [pk, unique]
  updatedAt date
  createdAt date
  name text
  title text
  url text [unique]
  description text
  born date
}
*/

@ObjectType()
@Entity()
export class Person extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Field(() => String)
	@Column('text')
	name: string

	@Field(() => String)
	@Column('text', { unique: true })
	url: string

	@Field(() => String)
	@Column('text')
	description: string

	@Field(() => String)
	@Column('date')
	born: Date

	@Field(() => [Cast])
	casts: Cast[]
}

@InputType()
export class PersonInput {
	@Field(() => String)
	@Length(1, 255)
	name: string

	@Field(() => String)
	@Length(1, 255)
	url: string

	@Field(() => String)
	@Length(80, 500)
	description: string

	@Field(() => Date)
	@IsDate()
	born: Date
}

@InputType()
export class GetPersonByUrlInput {
	@Field(() => String)
	url: string
}
