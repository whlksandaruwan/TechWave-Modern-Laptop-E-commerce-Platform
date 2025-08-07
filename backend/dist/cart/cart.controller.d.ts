import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<import("./cart.entity").Cart>;
    addToCart(body: {
        productId: string;
        quantity: number;
    }, req: any): Promise<import("./cart.entity").Cart>;
    updateCartItem(itemId: string, body: {
        quantity: number;
    }, req: any): Promise<import("./cart.entity").Cart>;
    removeFromCart(itemId: string, req: any): Promise<import("./cart.entity").Cart>;
    clearCart(req: any): Promise<import("./cart.entity").Cart>;
}
