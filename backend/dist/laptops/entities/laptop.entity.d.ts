import { WishlistItem } from './wishlist-item.entity';
interface LaptopSpecs {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
    battery: string;
}
export declare class Laptop {
    id: string;
    name: string;
    description: string;
    price: number;
    specs: LaptopSpecs;
    images: string[];
    stock: number;
    categoryId: string;
    featured: boolean;
    wishlistItems: WishlistItem[];
    createdAt: Date;
    updatedAt: Date;
}
export {};
