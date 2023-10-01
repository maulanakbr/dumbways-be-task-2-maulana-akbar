import { App } from '@/app';
import CandidateRoute from './routes/candidate.route';

const app = new App([new CandidateRoute()]);

app.listening();
