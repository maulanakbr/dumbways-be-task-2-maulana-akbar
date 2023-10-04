import { Vote } from './vote.interface';

export interface Candidate {
  id: string;
  name: string;
  vision?: string;
  image?: string;
  votes: Vote[];
}
