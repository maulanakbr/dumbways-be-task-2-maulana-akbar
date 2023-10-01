import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public vision: string;
}

// export class UpdateCandidateDto {
//   @IsString()
//   public name: string;

//   @IsString()
//   public vision: string;

//   @IsString()
//   public image: string;
// }
