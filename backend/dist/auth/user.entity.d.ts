export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}
