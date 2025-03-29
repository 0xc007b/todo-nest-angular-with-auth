import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.signIn(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto): Promise<any> {
    return await this.authService.signUp(registerDto);
  }

  @Post('logout')
  async logout(): Promise<void> {
    return await this.authService.signOut();
  }

  // @Post('refresh')
  // async refresh(@Body() refreshDto: RefreshDto): Promise<AuthResponseDto> {
  //   return this.authService.refresh(refreshDto);
  // }

  // @Post('verify')
  // async verify(@Body() verifyDto: VerifyDto): Promise<void> {
  //   return this.authService.verify(verifyDto);
  // }
}
