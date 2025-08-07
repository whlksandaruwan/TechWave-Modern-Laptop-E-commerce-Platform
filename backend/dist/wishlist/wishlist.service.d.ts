import { Repository } from 'typeorm';
import { WishlistItem } from './wishlist.entity';
import { User } from '../auth/user.entity';
import { Laptop } from '../laptops/entities/laptop.entity';
export declare class WishlistService {
    private wishlistItemRepository;
    private laptopRepository;
    constructor(wishlistItemRepository: Repository<WishlistItem>, laptopRepository: Repository<Laptop>);
    getWishlist(user: User): Promise<WishlistItem[]>;
    addToWishlist(user: User, productId: string): Promise<WishlistItem>;
    removeFromWishlist(user: User, productId: string): Promise<void>;
    clearWishlist(user: User): Promise<void>;
    isInWishlist(user: User, productId: string): Promise<boolean>;
}
