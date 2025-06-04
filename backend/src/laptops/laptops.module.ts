
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaptopsController } from './laptops.controller';
import { LaptopsService } from './laptops.service';
import { Laptop } from './laptop.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Laptop])],
  controllers: [LaptopsController],
  providers: [LaptopsService],
})
export class LaptopsModule {} 