import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTurmaDto } from './dto/turma-dto';

@Injectable()
export class TurmaService {
  constructor(private prisma: PrismaService) {}

  async getTurmas() {
    return await this.prisma.turma.findMany();
  }

  async getTurmaById(id: number) {
    return await this.prisma.turma.findUnique({
      where: {
        idturma: id,
      },
    });
  }

  async createTurma(turma: CreateTurmaDto) {
    const result = await this.prisma.turma.create({
      data: turma,
    });
    return result;
  }
}
