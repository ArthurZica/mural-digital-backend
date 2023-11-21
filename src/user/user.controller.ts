import { Body, Controller, /* Get, Param,  */ Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

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
    const user = await this.userService.create(createUserDto);
    if (user) {
      return res.status(201).send({ message: 'Usuario criado com sucesso!' });
    }
  }
}
