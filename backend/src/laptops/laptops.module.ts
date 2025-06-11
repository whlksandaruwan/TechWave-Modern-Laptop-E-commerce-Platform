import { TypeOrmModule } from '@nestjs/typeorm';
import { LaptopsController } from './laptops.controller';
import { LaptopsService } from './laptops.service';
import { Laptop } from './entities/laptop.entity';
import { WishlistItem } from './entities/wishlist-item.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Laptop, WishlistItem])],
  controllers: [LaptopsController],
  providers: [LaptopsService],
})
export class LaptopsModule {} 