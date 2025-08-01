import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartItem } from './cart.entity';
import { Laptop } from '../laptops/entities/laptop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Laptop])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {} 