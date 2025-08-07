import { BannersService } from './banners.service';
import { Banner } from './banner.entity';
export declare class BannersController {
    private readonly bannersService;
    constructor(bannersService: BannersService);
    findAll(): Promise<Banner[]>;
    findActive(): Promise<Banner[]>;
    findOne(id: string): Promise<Banner>;
    create(createBannerDto: Partial<Banner>): Promise<Banner>;
    update(id: string, updateBannerDto: Partial<Banner>): Promise<Banner>;
    remove(id: string): Promise<void>;
}
