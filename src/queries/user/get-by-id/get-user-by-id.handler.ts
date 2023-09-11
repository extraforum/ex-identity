import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from 'src/user/services/user.service';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userService: UserService) {}

  execute(query: GetUserByIdQuery) {
    return this.userService.findOne(+query.id);
  }
}
