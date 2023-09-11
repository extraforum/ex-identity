import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthService } from "src/user/services/auth.service";
import { RegisterCommand } from "./register.command";

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler<RegisterCommand> {
    constructor(private readonly authService: AuthService) {}

    async execute(command: RegisterCommand) {
        
    }
}
