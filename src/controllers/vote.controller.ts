import { Vote } from '@/interfaces/vote.interface';
import { VoteService } from '@/services/vote.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class VoteController {
  private voter = Container.get(VoteService);

  public createVoter = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const voterData: Vote = req.body;

      const createVoterData = await this.voter.createVoter(voterData);

      res.status(201).json({
        data: createVoterData,
        message: 'Created voter data',
      });
    } catch (error) {
      next(error);
    }
  };
}
