import { IsString, IsNotEmpty } from 'class-validator';

export class CandidateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public vision!: string;

  @IsString()
  @IsNotEmpty()
  public image!: string;
}
