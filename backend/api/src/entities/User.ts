import { Field, ID, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

/*
Table User {
  id text [pk, unique]
  updatedAt date
  createdAt date
  first_name text
  last_name text
  title text
  email text [unique]
  email_verified boolean
  password text
  born date
  roles "text[]"
}
 */

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Field(() => String)
	@Column('text')
	first_name: string

	@Field(() => String)
	@Column('text')
	last_name: string

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true })
	title?: string

	@Field(() => String)
	@Column('text', { unique: true })
	email: string

	@Field(() => Boolean)
	@Column('boolean')
	email_verified: boolean

	@Field(() => String)
	@Column('text')
	password: string

	@Field(() => Date)
	@Column('date')
	born: Date

	@Field(() => [String])
	@Column('text', { array: true, default: [] })
	roles: string[]
}
