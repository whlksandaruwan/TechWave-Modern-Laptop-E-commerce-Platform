import { User } from '../../auth/user.entity';
import { Laptop } from './laptop.entity';
export declare class WishlistItem {
    id: string;
    addedAt: Date;
    user: User;
    userId: string;
    laptop: Laptop;
    laptopId: string;
}
