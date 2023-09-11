import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuhtController } from './controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterCommandHandler } from 'src/commands/auth/register/register.handler';
import { LoginCommandHandler } from 'src/commands/auth/login/login.handler';
import { DeleteUserCommandHandler } from 'src/commands/user/delete-user/delete-user.handler';
import { UpdateUserCommandHandler } from 'src/commands/user/update-user/update-user.handler';
import { GetListUsersQueryHandler } from 'src/queries/user/get-list-users/get-list-users.handler';
import { GetUserByIdQueryHandler } from 'src/queries/user/get-by-id/get-user-by-id.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
    CqrsModule,
  ],
  controllers: [UserController, AuhtController],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    RegisterCommandHandler,
    LoginCommandHandler,
    DeleteUserCommandHandler,
    UpdateUserCommandHandler,
    GetListUsersQueryHandler,
    GetUserByIdQueryHandler
  ],
})
export class UserModule {}
