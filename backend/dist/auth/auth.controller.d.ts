import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class AuthController {
    private readonly authService;
    private userRepository;
    constructor(authService: AuthService, userRepository: Repository<User>);
    register(registerDto: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        name?: string;
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
    login(loginDto: {
        email: string;
        password: string;
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
    getCurrentUser(userId: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "user" | "admin";
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUsers(): Promise<User[]>;
}
