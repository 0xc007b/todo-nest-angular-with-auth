import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(u: CreateUserDto): Promise<User> {
    const user = await this.usersService.createUser(u);
    return user;
  }

  async signIn(
    authData: LoginDto,
  ): Promise<{ user: User; access_token: string }> {
    const user = await this.usersService.getUserByUsernameOrEmail(
      authData.emailOrUsername,
    );
    if (
      !user ||
      !(await this.usersService.comparePassword(
        authData.password,
        user.passwordHash!,
      ))
    ) {
      throw new UnauthorizedException();
    }
    //TODO: generate a jwt token
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };
    const access_token = await this.jwtService.signAsync(payload);
    delete user.passwordHash;
    return { user, access_token };
  }

  async signOut(): Promise<void> {
    // Implement sign out logic here by invalidating the token
  }
}
