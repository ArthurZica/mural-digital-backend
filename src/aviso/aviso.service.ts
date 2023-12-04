import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvisoDto } from './dto/aviso-dto';

@Injectable()
export class AvisoService {
  constructor(private prisma: PrismaService) {}

  async getAvisos(res: any) {
    const retorno = await this.prisma.aviso.findMany();
    if (!retorno || retorno.length == 0) {
      return res
        .status(404)
        .json({ message: 'Não tem avisos para você, volte mais tarde!' });
    }
    return res.status(200).json({ message: 'success', retorno: retorno });
  }

  async createAviso(aviso: CreateAvisoDto) {
    const fk_turma_idturma = aviso.fk_turma_idturma;
    delete aviso.fk_turma_idturma;

    const result = await this.prisma.aviso.create({
      data: aviso,
    });
    if (result) {
      const pertence = await this.prisma.pertence.create({
        data: {
          fk_aviso_idaviso: result.idaviso,
          fk_turma_idturma: fk_turma_idturma,
        },
      });
      if (pertence) {
        return pertence;
      }
    }
  }

  async getAllAvisos(id: number, res: any) {
    console.log('id_turma:', id);
    const avisos = await this.prisma.pertence.findMany({
      where: {
        OR: [{ fk_turma_idturma: id }, { fk_turma_idturma: null }],
      },
    });
    if (!avisos || avisos.length == 0) {
      return res
        .status(404)
        .json({ message: 'Não tem avisos para você, volte mais tarde!' });
    } else {
      const avisosId = avisos.map((aviso) => aviso.fk_aviso_idaviso);
      const retorno = await this.prisma.aviso.findMany({
        where: {
          idaviso: {
            in: avisosId,
          },
        },
      });
      return res.status(200).json({ message: 'success', retorno: retorno });
    }
  }

  async getAvisosByTurma(id: number, res: any) {
    console.log('id_turma:', id);
    const avisos = await this.prisma.pertence.findMany({
      where: {
        fk_turma_idturma: id,
      },
    });
    if (!avisos || avisos.length == 0) {
      return res
        .status(404)
        .json({ message: 'Não tem avisos para você, volte mais tarde!' });
    } else {
      const avisosId = avisos.map((aviso) => aviso.fk_aviso_idaviso);
      const retorno = await this.prisma.aviso.findMany({
        where: {
          idaviso: {
            in: avisosId,
          },
        },
      });
      return res.status(200).json({ message: 'success', retorno: retorno });
    }
  }
}
