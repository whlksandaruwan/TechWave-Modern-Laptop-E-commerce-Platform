import { Repository } from 'typeorm';
import { Laptop } from './entities/laptop.entity';
export declare class LaptopsService {
    private laptopsRepository;
    constructor(laptopsRepository: Repository<Laptop>);
    findAll(): Promise<Laptop[]>;
    findOne(id: string): Promise<Laptop>;
    create(laptop: Partial<Laptop>): Promise<Laptop>;
    update(id: string, laptop: Partial<Laptop>): Promise<Laptop>;
    remove(id: string): Promise<void>;
}
