import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AvisoModule } from './aviso/aviso.module';
import { TurmaService } from './turma/turma.service';
import { TurmaController } from './turma/turma.controller';
import { TurmaModule } from './turma/turma.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, AvisoModule, TurmaModule],
  controllers: [AppController, TurmaController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    TurmaService,
  ],
})
export class AppModule {}
