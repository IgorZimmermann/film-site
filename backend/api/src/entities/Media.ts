import { IsDate, Length } from 'class-validator'
import moment from 'moment'
import { Field, ID, InputType, ObjectType, Root } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Cast } from './Cast'
import { MediaStudio } from './MediaStudio'

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

	@Field(() => Boolean)
	isAvailable(@Root() parent: Media) {
		return moment(parent.available_from).isBefore()
	}

	@Field(() => String)
	@Column('text')
	original_language: string

	@Field(() => String)
	@Column('text')
	country_of_origin: string

	@Field(() => [String])
	@Column('text', { array: true })
	keywords: string[]

	@Field(() => [Cast])
	casts: Cast[]

	@Field(() => [MediaStudio])
	studios: MediaStudio[]
}

@InputType()
export class MediaInput {
	@Field(() => String)
	@Length(1, 255)
	title: string

	@Field(() => String)
	@Length(1, 255)
	url: string

	@Field(() => String)
	@Length(80, 300, {
		message: 'Length must be between 80 and 200 characters long',
	})
	tagline: string

	@Field(() => String)
	@Length(130, 700, {
		message: 'Length must be between 130 and 500 characters long',
	})
	overview: string

	@Field(() => Date)
	@IsDate()
	release_date: Date

	@Field(() => Date)
	@IsDate()
	available_from: Date

	@Field(() => String)
	original_language: string

	@Field(() => String)
	country_of_origin: string

	@Field(() => [String])
	keywords: string[]
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
}

@InputType()
export class getMediaByUrlInput {
	@Field(() => String)
	url: string
}

@InputType()
export class getMediaByIdInput {
	@Field(() => String)
	id: string
}
