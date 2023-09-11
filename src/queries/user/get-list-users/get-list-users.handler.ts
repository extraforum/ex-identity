import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetListUsersQuery } from './get-list-users.query';
import { UserService } from 'src/user/services/user.service';

@QueryHandler(GetListUsersQuery)
export class GetListUsersQueryHandler implements IQueryHandler<GetListUsersQuery> {
  constructor(private readonly userService: UserService) {}

  execute(query: GetListUsersQuery) {
    return this.userService.findAll();
  }
}
