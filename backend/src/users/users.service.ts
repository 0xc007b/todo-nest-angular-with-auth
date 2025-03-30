import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { User as PrismaUser, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

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

  async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    const user: PrismaUser | null = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
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
    // Check if user with email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Check if username is taken
    const existingUsername = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    // hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    try {
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
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `User with this ${error.meta.target.join(', ')} already exists`,
        );
      }
      throw error;
    }
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

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
