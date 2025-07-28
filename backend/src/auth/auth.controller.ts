import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: { 
      email: string; 
      password: string; 
      firstName: string; 
      lastName: string;
      name?: string;
    },
  ) {
    // Handle both name and firstName/lastName formats
    let firstName = registerDto.firstName;
    let lastName = registerDto.lastName;
    
    if (registerDto.name && !firstName && !lastName) {
      const nameParts = registerDto.name.trim().split(' ');
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(' ') || '';
    }
    
    return this.authService.register({
      email: registerDto.email,
      password: registerDto.password,
      firstName,
      lastName,
    });
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@CurrentUser() userId: string) {
    return this.authService.validateUser(userId);
  }

  @Get('users')
  async getAllUsers() {
    // You may want to add admin guard here in production
    const users = await this.userRepository.find({ select: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt'] });
    return users;
  }
} 