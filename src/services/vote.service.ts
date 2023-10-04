import { VoteEntity } from '@/entities/vote.entity';
import { HttpException } from '@/exceptions/httpException';
import { Vote } from '@/interfaces/vote.interface';
import { Service } from 'typedi';
import { Repository } from 'typeorm';

@Service()
export class VoteService extends Repository<VoteEntity> {
  public async createVoter(voterData: Vote): Promise<Vote> {
    const findVoter: Vote = await VoteEntity.findOne({
      where: { name: voterData.name },
    });

    if (findVoter)
      throw new HttpException(
        409,
        `This voter ${voterData.name} already exists`,
      );

    const createVoterData: Vote = await VoteEntity.create({
      ...voterData,
    }).save();

    return createVoterData;
  }
}
