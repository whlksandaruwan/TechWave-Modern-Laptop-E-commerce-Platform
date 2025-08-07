import { User } from '../auth/user.entity';
export declare class WishlistItem {
    id: string;
    user: User;
    productId: string;
    productName: string;
    price: number;
    productImage: string;
    createdAt: Date;
    updatedAt: Date;
}
