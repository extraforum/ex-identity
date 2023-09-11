import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  // Inject user repository
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    let userExists = await this.userRepository.findOne({
      where: [{ username: username }, { email: email }],
    });

    if (userExists) {
      throw new ConflictException('Username or email already exists');
    }

    let user: User = new User();
    user.username = username;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.created_at = new Date(Date.now());

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let userExists = await this.findOne(id);
    if (!userExists) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    const { username, email, password } = updateUserDto;
    userExists.username = username;
    userExists.email = email;
    userExists.password = password;
    userExists.updated_at = new Date(Date.now());

    return this.userRepository.save(userExists);
  }

  remove(id: number) {
    let userExists = this.findOne(id);
    if (!userExists) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.delete(id);
  }

  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new HttpException('Email or password is incorrect', HttpStatus.UNAUTHORIZED);
    }

    const isEqual = bcrypt.compareSync(password, user.password);

    if (!isEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
