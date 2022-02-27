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
Table Media {
  id text [pk, unique]
  updatedAt date
  createdAt date
  title text
  url text [unique]
  tagline text
  overview text
  release_date date
  available_from date
  original_language text
  country_of_origin text
  keywords "text[]"
  cameras "text[]"
  lenses "text[]"
}
*/

@ObjectType()
@Entity()
export class Media extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Field(() => String)
	@Column('text')
	title: string

	@Field(() => String)
	@Column('text')
	url: string

	@Field(() => String)
	@Column('text')
	tagline: string

	@Field(() => String)
	@Column('text')
	overview: string

	@Field(() => String)
	@Column('date')
	release_date: Date

	@Field(() => String)
	@Column('date')
	available_from: Date

	@Field(() => String)
	@Column('text')
	original_language: string

	@Field(() => String)
	@Column('text')
	country_of_origin: string

	@Field(() => [String])
	@Column('text', { array: true })
	keywords: string[]

	@Field(() => [String])
	@Column('text', { array: true })
	cameras: string[]

	@Field(() => [String])
	@Column('text', { array: true })
	lenses: string[]
}

@InputType()
export class MediaInput {
	@Field(() => String)
	title: string

	@Field(() => String)
	url: string

	@Field(() => String)
	tagline: string

	@Field(() => String)
	overview: string

	@Field(() => String)
	release_date: Date

	@Field(() => String)
	available_from: Date

	@Field(() => String)
	original_language: string

	@Field(() => String)
	country_of_origin: string

	@Field(() => [String])
	keywords: string[]

	@Field(() => [String])
	cameras: string[]

	@Field(() => [String])
	lenses: string[]
}

@InputType()
export class MediaUpdateInput {
	@Field(() => String, { nullable: true })
	title?: string

	@Field(() => String, { nullable: true })
	url?: string

	@Field(() => String, { nullable: true })
	tagline?: string

	@Field(() => String, { nullable: true })
	overview?: string

	@Field(() => String, { nullable: true })
	release_date?: Date

	@Field(() => String, { nullable: true })
	available_from?: Date

	@Field(() => String, { nullable: true })
	original_language?: string

	@Field(() => String, { nullable: true })
	country_of_origin?: string

	@Field(() => [String], { nullable: true })
	keywords?: string[]

	@Field(() => [String], { nullable: true })
	cameras?: string[]

	@Field(() => [String], { nullable: true })
	lenses?: string[]
}
