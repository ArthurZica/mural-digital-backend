import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { Response } from 'express';
import { User } from 'src/user/entities/user.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Get('me')
  async getUser(@Res() res: Response, @CurrentUser() user: User) {
    if (user) {
      res.status(200).send({
        nome: user.nome,
        pessoa_tipo: user.pessoa_tipo,
        matricula: user.matricula,
      });
    } else {
      res.status(401).send({ message: 'usuario não encontrado' });
    }
  }
}
