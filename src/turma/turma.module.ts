import { Module } from '@nestjs/common';
import { TurmaController } from './turma.controller';
import { TurmaService } from './turma.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TurmaService, PrismaService],
  controllers: [TurmaController],
})
export class TurmaModule {}
