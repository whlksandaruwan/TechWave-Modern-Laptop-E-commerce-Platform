
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Laptop } from './laptop.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LaptopsService {
  constructor(
    @InjectRepository(Laptop)
    private laptopsRepository: Repository<Laptop>,
  ) {}

  findAll(): Promise<Laptop[]> {
    return this.laptopsRepository.find();
  }

  findOne(id: number): Promise<Laptop> {
    return this.laptopsRepository.findOne({ where: { id } });
  }

  create(laptop: Partial<Laptop>): Promise<Laptop> {
    const newLaptop = this.laptopsRepository.create(laptop);
    return this.laptopsRepository.save(newLaptop);
  }

  async update(id: number, laptop: Partial<Laptop>): Promise<Laptop> {
    await this.laptopsRepository.update(id, laptop);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.laptopsRepository.delete(id);
  }
} 