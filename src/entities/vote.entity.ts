import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { CandidateEntity } from './candidate.entity';

@Entity({ name: 'votes' })
export class VoteEntity extends BaseEntity implements VoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @Unique(['name'])
  name: string;

  @ManyToOne(() => CandidateEntity, candidate => candidate.votes)
  candidate: string;
}
