import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.pessoaCreateInput = {
      ...createUserDto,
      senha: await bcrypt.hash(createUserDto.senha, 10),
    };

    const createdUser = await this.prisma.pessoa.create({ data });

    return {
      ...createdUser,
      senha: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.pessoa.findFirst({ where: { email } });
  }

  findByMatricula(matricula: number) {
    return this.prisma.pessoa.findFirst({ where: { matricula } });
  }

  async verifyExists(matricula: number, email: string) {
    return this.prisma.pessoa.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          { matricula: matricula },
        ],
      },
    });
  }
}
