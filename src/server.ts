import { App } from '@/app';
import CandidateRoute from './routes/candidate.route';
import VoteRoute from './routes/voter.route';

const app = new App([new CandidateRoute(), new VoteRoute()]);

app.listening();
