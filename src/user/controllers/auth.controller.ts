import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { LoginUserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuhtController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
    return await this.authService.login(userDto);
  }
}
