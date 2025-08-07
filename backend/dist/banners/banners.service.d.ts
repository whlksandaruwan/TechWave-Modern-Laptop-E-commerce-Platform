import { Repository } from 'typeorm';
import { Banner } from './banner.entity';
export declare class BannersService {
    private bannersRepository;
    constructor(bannersRepository: Repository<Banner>);
    findAll(): Promise<Banner[]>;
    findActive(): Promise<Banner[]>;
    findOne(id: string): Promise<Banner>;
    create(banner: Partial<Banner>): Promise<Banner>;
    update(id: string, banner: Partial<Banner>): Promise<Banner>;
    remove(id: string): Promise<void>;
}
