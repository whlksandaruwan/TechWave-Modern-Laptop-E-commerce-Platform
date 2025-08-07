import { LaptopsService } from './laptops.service';
import { Laptop } from './entities/laptop.entity';
export declare class LaptopsController {
    private readonly laptopsService;
    constructor(laptopsService: LaptopsService);
    findAll(): Promise<Laptop[]>;
    findOne(id: string): Promise<Laptop>;
    create(laptop: Partial<Laptop>): Promise<Laptop>;
    update(id: string, laptop: Partial<Laptop>): Promise<Laptop>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
