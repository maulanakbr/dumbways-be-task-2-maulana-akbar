import { Candidate } from '@/interfaces/candidate.interface';
import { Service } from 'typedi';
import { CandidateEntity } from '@/entities/candidate.entity';
import { HttpException } from '@/exceptions/httpException';
import { Repository } from 'typeorm';
import { deleteFile } from '@/utils/cloudinary';

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
    isFile: Express.Multer.File,
    candidateId: string,
    candidateData: Candidate,
  ): Promise<Candidate> {
    const findCandidate: Candidate = await CandidateEntity.findOne({
      where: { id: candidateId },
    });

    if (findCandidate && findCandidate.image !== '' && isFile) {
      const imageUrl = findCandidate.image
        .split('/')[8]
        .toString()
        .split('.')[0];

      await deleteFile(imageUrl);
    }

    await CandidateEntity.update(candidateId, candidateData);

    const updateCandidate: Candidate = await CandidateEntity.findOne({
      where: { id: candidateId },
    });

    return updateCandidate;
  }

  public async deleteCandidate(candidateId: string): Promise<Candidate> {
    const findCandidate: Candidate = await CandidateEntity.findOne({
      where: { id: candidateId },
    });

    if (!findCandidate)
      throw new HttpException(404, `Candidates cannot be found`);

    await CandidateEntity.delete({ id: candidateId });

    return findCandidate;
  }
}
