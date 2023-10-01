import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Candidate } from '@/interfaces/candidate.interface';
import { CandidateService } from '@services/candidate.service';
import { uploadFile } from '@/utils/cloudinary';
import { HttpException } from '@/exceptions/httpException';

export class CandidateController {
  private candidate = Container.get(CandidateService);

  public createCandidate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const candidateData: Candidate = req.body;
      const file = req.file;

      if (!file) throw new HttpException(400, 'File not found');

      const uploadedFile = await uploadFile(file.path);
      candidateData.image = uploadedFile.secure_url;

      const createCandidateData: Candidate =
        await this.candidate.createCandidate(candidateData);

      res.status(201).json({
        data: createCandidateData,
        message: 'Created candidate data',
      });
    } catch (error) {
      next(error);
    }
  };

  public findAllCandidates = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const allCandidates = await this.candidate.findAllCandidates();

      res
        .status(201)
        .json({ data: allCandidates, message: 'Found all candidates' });
    } catch (error) {
      next(error);
    }
  };

  public updateCandidate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const candidateId = Number(req.params.id);
      const candidateData: Candidate = req.body;
      const updateCandidateData: Candidate =
        await this.candidate.updateCandidate(candidateId, candidateData);

      res.status(200).json({ data: updateCandidateData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCandidate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const candidateId = Number(req.params.id);
      const deleteCandidateData: Candidate =
        await this.candidate.deleteCandidate(candidateId);

      res.status(200).json({ data: deleteCandidateData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}