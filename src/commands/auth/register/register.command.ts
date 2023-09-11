import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
