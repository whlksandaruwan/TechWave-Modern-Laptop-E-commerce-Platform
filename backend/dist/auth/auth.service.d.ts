import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: "user" | "admin";
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: "user" | "admin";
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    validateUser(id: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "user" | "admin";
        createdAt: Date;
        updatedAt: Date;
    }>;
}
