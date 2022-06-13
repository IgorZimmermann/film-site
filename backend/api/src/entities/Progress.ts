import { Field, ID, InputType, Int, ObjectType, Root } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { MediaSource } from './MediaSource'

@ObjectType()
@Entity()
export class Progress extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Field(() => Int)
	@Column('int')
	progress: number

	@Field(() => Int)
	@Column('int')
	duration: number

	@Field(() => ID)
	@Column('text')
	userId: string

	@Field(() => ID)
	@Column('text')
	mediaSourceId: string

	@Field(() => MediaSource)
	async mediaSource(@Root() parent: Progress): Promise<MediaSource> {
		const mediasource = await MediaSource.findOne({
			where: { id: parent.mediaSourceId },
		})
		return mediasource!
	}

	@Field(() => Boolean)
	finished(@Root() parent: Progress): Boolean {
		return parent.duration * 0.95 < parent.progress
	}
}

@InputType()
export class ProgressInput {
	@Field(() => Int)
	progress: number

	@Field(() => Int)
	duration: number

	@Field(() => ID)
	mediaSourceId: string
}

@InputType()
export class IsProgressInput {
	@Field(() => ID)
	mediaSourceId: string
}
