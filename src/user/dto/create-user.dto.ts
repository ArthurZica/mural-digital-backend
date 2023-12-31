import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  IsNumber,
  Matches,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  senha: string;

  @IsString()
  nome: string;

  @IsNumber()
  matricula: number;

  @IsNumber()
  pessoa_tipo: number;

  @IsOptional()
  @IsNumber()
  fk_turma_idturma?: number;
}
