import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenUserDto } from 'src/auth/dto/token-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async findMe(@Request() req: { user: TokenUserDto }) {
    const user = req.user;
    const userDto: User = await this.usersService.getUserById({ id: user.sub });
    delete userDto.passwordHash;
    return userDto;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: User = await this.usersService.getUserById({ id });
    delete user.passwordHash;
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
