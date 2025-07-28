import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './banner.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private bannersRepository: Repository<Banner>,
  ) {}

  findAll(): Promise<Banner[]> {
    return this.bannersRepository.find({
      order: { sortOrder: 'ASC', createdAt: 'DESC' }
    });
  }

  findActive(): Promise<Banner[]> {
    return this.bannersRepository.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', createdAt: 'DESC' }
    });
  }

  findOne(id: string): Promise<Banner> {
    return this.bannersRepository.findOne({ where: { id } });
  }

  create(banner: Partial<Banner>): Promise<Banner> {
    const newBanner = this.bannersRepository.create(banner);
    return this.bannersRepository.save(newBanner);
  }

  async update(id: string, banner: Partial<Banner>): Promise<Banner> {
    await this.bannersRepository.update(id, banner);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.bannersRepository.delete(id);
  }
}