import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistItem } from './wishlist.entity';
import { Laptop } from '../laptops/entities/laptop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistItem, Laptop])],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {} 