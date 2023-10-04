import { VoteController } from '@/controllers/vote.controller';
import { Route } from '@/interfaces/router.interface';
import { Router } from 'express';

export default class VoteRoute implements Route {
  public path = '/votes';
  public router: Router = Router();
  public votes = new VoteController();

  constructor() {
    this.executeRoutes();
  }

  private executeRoutes() {
    this.router.post(`${this.path}`, this.votes.createVoter);
  }
}
