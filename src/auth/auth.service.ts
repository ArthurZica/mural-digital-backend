import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      matricula: user.matricula,
      email: user.email,
      nome: user.nome,
      pessoa_tipo: user.pessoa_tipo,
    };

    return {
      access_token: this.jwtService.sign(payload),
      pessoa_tipo: user.pessoa_tipo,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.senha);

      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
