import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { User as PrismaUser, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    const users: PrismaUser[] = await this.prisma.user.findMany();
    const transformedUsers: User[] = users.map(
      (user) =>
        new User(
          user.id,
          user.username,
          user.firstname,
          user.lastname,
          user.email,
          user.passwordHash,
        ),
    );
    return transformedUsers;
  }

  async getUserById(id: Prisma.UserWhereUniqueInput): Promise<User> {
    const user: PrismaUser | null = await this.prisma.user.findUnique({
      where: id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new User(
      user.id,
      user.username,
      user.firstname,
      user.lastname,
      user.email,
      user.passwordHash,
    );
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // hash the password
    const hashedPassword = (await bcrypt.hash(
      createUserDto.password,
      16,
    )) as string;

    const createdUser: PrismaUser = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        firstname: createUserDto.firstName,
        lastname: createUserDto.lastName,
        email: createUserDto.email,
        passwordHash: hashedPassword,
      },
    });
    return new User(
      createdUser.id,
      createdUser.username,
      createdUser.firstname,
      createdUser.lastname,
      createdUser.email,
      createdUser.passwordHash,
    );
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser: PrismaUser = await this.prisma.user.update({
      where: { id },
      data: {
        username: updateUserDto.username,
        firstname: updateUserDto.firstName,
        lastname: updateUserDto.lastName,
        email: updateUserDto.email,
      },
    });
    return new User(
      updatedUser.id,
      updatedUser.username,
      updatedUser.firstname,
      updatedUser.lastname,
      updatedUser.email,
      updatedUser.passwordHash,
    );
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser: PrismaUser = await this.prisma.user.delete({
      where: { id },
    });
    return new User(
      deletedUser.id,
      deletedUser.username,
      deletedUser.firstname,
      deletedUser.lastname,
      deletedUser.email,
      deletedUser.passwordHash,
    );
  }
}
