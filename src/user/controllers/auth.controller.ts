import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCommand } from 'src/commands/auth/register/register.command';
import { LoginCommand } from 'src/commands/auth/login/login.command';

@ApiTags('Auth')
@Controller('auth')
export class AuhtController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.commandBus.execute(new RegisterCommand(userDto));
  }

  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
    return this.commandBus.execute(new LoginCommand(userDto));
  }
}
