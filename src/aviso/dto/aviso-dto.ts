import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateAvisoDto {
  @IsBoolean()
  recorrente: boolean;
  @IsBoolean()
  prioridade: boolean;

  @IsOptional()
  @IsString()
  texto: string;

  @IsOptional()
  @IsDateString()
  dtinicio?: Date;

  @IsOptional()
  @IsDateString()
  dtfim?: Date;

  @IsNumber()
  fk_pessoa_matricula: never;

  @IsOptional()
  @IsString()
  arquivo?: string;
}
