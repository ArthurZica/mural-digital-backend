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
    const result = await this.prisma.aviso.create({
      data: aviso,
    });
    return result;
  }
}
