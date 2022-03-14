import { IsDate, IsLowercase, Length } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { MediaStudio } from './MediaStudio'

/*
Table Studio {
  id text [pk, unique]
  updatedAt date
  createdAt date
  url text [unique]
  name text
  short_name text
  description text
  country_of_origin text
  founded date
}
*/

@ObjectType()
@Entity()
export class Studio extends BaseEntity {
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
	@Column('text')
	short_name: string

	@Field(() => String)
	@Column('text', { unique: true })
	url: string

	@Field(() => String)
	@Column('text')
	description: string

	@Field(() => String)
	@Column('text')
	country_of_origin: string

	@Field(() => String)
	@Column('date')
	founded: Date

	@Field(() => [MediaStudio])
	medias: MediaStudio[]
}

@InputType()
export class StudioInput {
	@Field(() => String)
	@Length(1, 255)
	name: string

	@Field(() => String)
	@Length(1, 20)
	short_name: string

	@Field(() => String)
	@Length(1, 255)
	@IsLowercase()
	url: string

	@Field(() => String)
	@Length(80, 500)
	description: string

	@Field(() => String)
	@Length(1, 255)
	country_of_origin: string

	@Field(() => Date)
	@IsDate()
	founded: Date
}

@InputType()
export class GetStudioByUrlInput {
	@Field(() => String)
	url: string
}
