import { Repository } from 'typeorm';
import { Cart, CartItem } from './cart.entity';
import { User } from '../auth/user.entity';
import { Laptop } from '../laptops/entities/laptop.entity';
export declare class CartService {
    private cartRepository;
    private cartItemRepository;
    private laptopRepository;
    constructor(cartRepository: Repository<Cart>, cartItemRepository: Repository<CartItem>, laptopRepository: Repository<Laptop>);
    getOrCreateCart(user: User): Promise<Cart>;
    addToCart(user: User, productId: string, quantity: number): Promise<Cart>;
    updateCartItem(user: User, itemId: string, quantity: number): Promise<Cart>;
    removeFromCart(user: User, itemId: string): Promise<Cart>;
    clearCart(user: User): Promise<Cart>;
    getCart(user: User): Promise<Cart>;
    private updateCartTotals;
}
