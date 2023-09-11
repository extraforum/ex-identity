import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);

    const token = this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  async login(userDto: LoginUserDto) {
    const user = await this.userService.findByLogin(userDto);
    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ email }): any {
    const accessToken = this.jwtService.sign({ email });
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }
}
