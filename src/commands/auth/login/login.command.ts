import { LoginUserDto } from 'src/user/dto/user.dto';

export class LoginCommand {
  constructor(public readonly loginUserDto: LoginUserDto) {}
}
