import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { LoginUserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCommand } from 'src/commands/auth/register.command';

@ApiTags('Auth')
@Controller('auth')
export class AuhtController {
  constructor(
    private readonly authService: AuthService,
    private readonly commandBus: CommandBus
  ) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    // return this.commandBus.execute(new RegisterCommand(userDto));
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
    return await this.authService.login(userDto);
  }
}
