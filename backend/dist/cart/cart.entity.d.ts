import { User } from '../auth/user.entity';
export declare class Cart {
    id: string;
    user: User;
    items: CartItem[];
    totalAmount: number;
    totalItems: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CartItem {
    id: string;
    cart: Cart;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
