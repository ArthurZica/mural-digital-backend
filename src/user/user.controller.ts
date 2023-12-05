import {
  Body,
  Controller,
  Get,
  /* Get, Param,  */ Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
/* import { IsPublic } from 'src/auth/decorators/is-public.decorator'; */
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const verify = await this.userService.verifyExists(
      createUserDto.matricula,
      createUserDto.email,
    );
    if (!!verify && !!verify.nome) {
      return res.status(400).send({
        message:
          'Já existe um usuário com essa matricula ou email por favor verifique esses campos e tente novamente',
      });
    }
    if (
      createUserDto.pessoa_tipo !== 0 &&
      createUserDto.fk_turma_idturma === null
    ) {
      return res.status(400).send({
        message: 'Por favor selecione uma turma',
      });
    }
    const user = await this.userService.create(createUserDto);
    if (user) {
      return res.status(201).send({ message: 'Usuario criado com sucesso!' });
    }
  }

  @Get()
  async getAllUsers(@Res() res: Response, @CurrentUser() user: User) {
    if (user.pessoa_tipo !== 0) {
      return res.status(401).send({
        message: 'Você não tem permissão para ver todos os usuários!',
      });
    }
    const users = await this.userService.getAllUsers();
    return res.status(200).send(users);
  }
}
