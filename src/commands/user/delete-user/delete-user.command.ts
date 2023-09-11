import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class DeleteUserCommand {
  constructor(public readonly id: string) {}
}
