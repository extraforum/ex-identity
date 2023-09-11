import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from 'src/user/services/auth.service';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LoginCommand) {
    const { loginUserDto } = command;
    return this.authService.login(loginUserDto);
  }
}
