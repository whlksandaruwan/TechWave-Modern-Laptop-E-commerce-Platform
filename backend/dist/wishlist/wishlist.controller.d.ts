import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(req: any): Promise<import("./wishlist.entity").WishlistItem[]>;
    addToWishlist(productId: string, req: any): Promise<import("./wishlist.entity").WishlistItem>;
    removeFromWishlist(productId: string, req: any): Promise<void>;
    clearWishlist(req: any): Promise<void>;
    checkWishlist(productId: string, req: any): Promise<{
        isInWishlist: boolean;
    }>;
}
