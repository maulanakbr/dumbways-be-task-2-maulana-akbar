import { Candidate } from '@/interfaces/candidate.interface';
import { Service } from 'typedi';
import { CandidateEntity } from '@/entities/candidate.entity';
import { HttpException } from '@/exceptions/httpException';
import { Repository } from 'typeorm';

@Service()
export class CandidateService extends Repository<CandidateEntity> {
  public async createCandidate(candidateData: Candidate): Promise<Candidate> {
    const findCandidate: Candidate = await CandidateEntity.findOne({
      where: { name: candidateData.name },
    });

    if (findCandidate)
      throw new HttpException(
        409,
        `This candidate ${candidateData.name} already exists`,
      );

    const createCandidateData: Candidate = await CandidateEntity.create({
      ...candidateData,
    }).save();
    return createCandidateData;
  }

  public async findAllCandidates(): Promise<Candidate[]> {
    const allCandidates: Candidate[] = await CandidateEntity.find();

    if (!allCandidates)
      throw new HttpException(404, `Candidates cannot be found`);

    return allCandidates;
  }

  public async updateCandidate(
    candidateId: number,
    candidateData: Candidate,
  ): Promise<Candidate> {
    const findCandiate: Candidate = await CandidateEntity.findOne({
      where: { id: candidateId },
    });

    if (!findCandiate)
      throw new HttpException(404, `Candidates cannot be found`);

    await CandidateEntity.update(candidateId, candidateData);

    const updateCandidate: Candidate = await CandidateEntity.findOne({
      where: { id: candidateId },
    });

    return updateCandidate;
  }

  public async deleteCandidate(candidateId: number): Promise<Candidate> {
    const findCandiate: Candidate = await CandidateEntity.findOne({
      where: { id: candidateId },
    });

    if (!findCandiate)
      throw new HttpException(404, `Candidates cannot be found`);

    await CandidateEntity.delete({ id: candidateId });

    return findCandiate;
  }
}
