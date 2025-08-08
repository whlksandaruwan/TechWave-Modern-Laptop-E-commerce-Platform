import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LaptopsModule } from './laptops/laptops.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { BannersModule } from './banners/banners.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    LaptopsModule,
    AuthModule,
    CategoriesModule,
    BannersModule,
    OrdersModule,
    CartModule,
    WishlistModule,
  ],
})
export class AppModule {} 
