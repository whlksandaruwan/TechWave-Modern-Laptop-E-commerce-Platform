import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LaptopsModule } from './laptops/laptops.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { BannersModule } from './banners/banners.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Kavindu2003',
      database: 'Lap',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    LaptopsModule,
    AuthModule,
    CategoriesModule,
    BannersModule,
  ],
})
export class AppModule {} 