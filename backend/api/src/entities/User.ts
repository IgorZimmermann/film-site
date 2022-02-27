import { IsDate, IsEmail, Length, MinDate, MinLength } from 'class-validator'
import { Field, ID, InputType, ObjectType, Root } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IsEmailAvailable } from '../validators/isEmailAvailable'

/*
Table User {
  id text [pk, unique]
  updatedAt date
  createdAt date
  first_name text
  last_name text
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

	@Field(() => String)
	name(@Root() parent: User) {
		return `${parent.first_name} ${parent.last_name}`
	}

	@Field(() => String)
	@Column('text', { unique: true })
	email: string

	@Column('boolean', { default: false })
	email_verified: boolean

	@Column('text')
	password: string

	@Field(() => Date)
	@Column('date')
	born: Date

	@Field(() => [String])
	@Column('text', { array: true, default: [] })
	roles: string[]
}

@InputType()
export class LoginInput {
	@Field(() => String)
	@IsEmail()
	email: string

	@Field(() => String)
	@MinLength(8)
	password: string
}

@InputType()
export class RegisterInput {
	@Field(() => String)
	@Length(1, 255)
	@Column('text')
	first_name: string

	@Field(() => String)
	@Length(1, 255)
	@Column('text')
	last_name: string

	@Field(() => String)
	@Length(1, 255)
	@IsEmail()
	@IsEmailAvailable({ message: 'email is already in use' })
	@Column('text', { unique: true })
	email: string

	@Field(() => String)
	@MinLength(8, { message: 'password is not long enough' })
	@Column('text')
	password: string

	@Field(() => Date)
	@IsDate()
	@MinDate(new Date('1992-01-01'))
	@Column('date')
	born: Date
}

@InputType()
export class PermissionInput {
	@Field(() => ID)
	id: string

	@Field(() => String)
	permission: string
}

@InputType()
export class getUserByEmailInput {
	@Field(() => String)
	email: string
}
