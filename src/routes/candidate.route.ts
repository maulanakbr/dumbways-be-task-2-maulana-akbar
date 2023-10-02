import { Router } from 'express';
import { Route } from '@/interfaces/router.interface';
import { CandidateController } from '@/controllers/candidate.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Upload } from '@/middlewares/upload.middleware';
import { CandidateDto } from '@/dtos/candidates.dto';

export default class CandidateRoute implements Route {
  public path = '/candidates';
  public router: Router = Router();
  public candidates = new CandidateController();

  constructor() {
    this.executeRoutes();
  }

  private executeRoutes() {
    this.router.get(`${this.path}`, this.candidates.findAllCandidates);
    this.router.post(
      `${this.path}`,
      Upload.single('image'),
      ValidationMiddleware(CandidateDto, true),
      this.candidates.createCandidate,
    );
    this.router.put(
      `${this.path}/:id`,
      Upload.single('image'),
      ValidationMiddleware(CandidateDto, true),
      this.candidates.updateCandidate,
    );
    this.router.delete(`${this.path}/:id`, this.candidates.deleteCandidate);
  }
}
