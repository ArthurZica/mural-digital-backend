import { Controller, Get, Req, Res, Post, Body, Query } from '@nestjs/common';
import { Response } from 'express';
import { AvisoService } from './aviso.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateAvisoDto } from './dto/aviso-dto';
@Controller('aviso')
export class AvisoController {
  constructor(private readonly avisoService: AvisoService) {}

  @Get()
  async getAvisos(
    @Req() req: any,
    @Res() res: Response,
    @CurrentUser() user: User,
  ) {
    console.log('aaaaaaaaaaa', user);
    if (user.pessoa_tipo == 0) {
      await this.avisoService.getAvisos(res);
    } else {
      await this.avisoService.getAllAvisos(user.fk_turma_idturma, res);
    }
    console.log(user);
  }

  @Get('turma')
  async getAvisosByTurma(
    @Res() res: Response,
    @CurrentUser() user: User,
    @Query('id') id: number,
  ) {
    console.log('iddddddddddd', id);
    if (user.pessoa_tipo == 0) {
      return this.avisoService.getAvisosByTurma(id, res);
    }
    if (user.fk_turma_idturma == id) {
      return this.avisoService.getAvisosByTurma(id, res);
    }
    if (user.fk_turma_idturma !== id) {
      return res.status(401).json({
        message: 'Você não tem permissão para ver os avisos dessa turma!',
      });
    }
  }

  @Post()
  async createAviso(
    @Body() createAvisoDto: CreateAvisoDto,
    @Res() res: Response,
    @CurrentUser() user: User,
  ) {
    console.log(user);
    if (user.pessoa_tipo !== 0) {
      return res
        .status(401)
        .json({ message: 'Apenas administradores podem criar avisos!' });
    }
    const result = await this.avisoService.createAviso(createAvisoDto);
    if (result) {
      return res.status(201).json({ message: 'Aviso criado com sucesso!' });
    }
    if (!result) {
      return res
        .status(500)
        .json({ message: 'erro ao criar aviso tente novamente mais tarde' });
    }
  }
}
