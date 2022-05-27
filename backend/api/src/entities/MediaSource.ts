import {
	Field,
	ID,
	InputType,
	ObjectType,
	registerEnumType,
} from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

enum SourceType {
	TRAILER = 'trailer',
	CLIP = 'clip',
	MOVIE = 'movie',
	EPISODE = 'episode',
}

registerEnumType(SourceType, {
	name: 'SourceType',
})

@ObjectType()
@Entity()
export class MediaSource extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Field(() => String)
	@Column('text')
	mediaId: string

	@Field(() => SourceType)
	@Column('text')
	type: SourceType

	@Field(() => String)
	@Column('text')
	src: string

	@Field(() => String)
	@Column('text')
	title: string

	@Field(() => String)
	@Column('text')
	thumbnail: string
}

@InputType()
export class MediaSourceInput {
	@Field(() => String)
	mediaId: string

	@Field(() => SourceType)
	type: SourceType

	@Field(() => String)
	src: string

	@Field(() => String)
	title: string

	@Field(() => String)
	thumbnail: string
}

@InputType()
export class GetSourceByMediaInput {
	@Field(() => ID)
	mediaId: string

	@Field(() => SourceType)
	type: SourceType
}

@InputType()
export class GetSourceByIdInput {
	@Field(() => ID)
	id: string
}
