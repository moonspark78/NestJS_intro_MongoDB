import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUsers(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getsUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.usersService.getUsersById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }
}
