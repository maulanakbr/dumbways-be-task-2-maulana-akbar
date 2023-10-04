import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Candidate } from '@interfaces/candidate.interface';
import { VoteEntity } from './vote.entity';
import { Vote } from '@/interfaces/vote.interface';

@Entity({ name: 'candidates' })
export class CandidateEntity extends BaseEntity implements Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @Unique(['name'])
  name: string;

  @Column()
  @IsNotEmpty()
  vision: string;

  @Column()
  image: string;

  @OneToMany(() => VoteEntity, vote => vote.candidate)
  votes: Vote[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
