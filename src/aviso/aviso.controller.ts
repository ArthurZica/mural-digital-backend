import { Controller, Get, Req, Res, Post, Body } from '@nestjs/common';
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
    await this.avisoService.getAvisos(res);
    console.log(user);
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
