import { Module } from '@nestjs/common';
import { AvisoService } from './aviso.service';
import { AvisoController } from './aviso.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AvisoService, PrismaService],
  controllers: [AvisoController],
})
export class AvisoModule {}
