import { IsString } from 'class-validator';

export class CreateTurmaDto {
  @IsString()
  serie: string;
  @IsString()
  gruposerie: string;
}
