import { Controller, Get, Req, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { TurmaService } from './turma.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateTurmaDto } from './dto/turma-dto';

@Controller('turma')
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}
  @Get()
  async getTurmas(
    @Req() req: any,
    @Res() res: Response,
    @CurrentUser() user: User,
  ) {
    if (user.pessoa_tipo !== 0) {
      const result = await this.turmaService.getTurmaById(
        user.fk_turma_idturma,
      );
      res.status(200).send(result);
    } else {
      const result = await this.turmaService.getTurmas();
      res.status(200).send(result);
    }
  }

  @Post()
  async createTurma(
    @Body() turma: CreateTurmaDto,
    @Res() res: Response,
    @CurrentUser() user: User,
  ) {
    if (user.pessoa_tipo !== 0) {
      return res
        .status(401)
        .json({ message: 'Apenas administradores podem criar avisos!' });
    }
    const result = await this.turmaService.createTurma(turma);
    if (result) {
      return res.status(201).json({ message: 'Turma criada com sucesso!' });
    }
  }
}
