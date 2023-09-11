import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from 'src/user/services/user.service';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: UpdateUserCommand) {
    const id = command.id;
    return this.userService.update(+id, command.updateUserDto);
  }
}
