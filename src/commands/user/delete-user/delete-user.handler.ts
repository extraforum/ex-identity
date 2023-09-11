import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';
import { UserService } from 'src/user/services/user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: DeleteUserCommand) {
    const id = command.id;
    return this.userService.remove(+id);
  }
}
