import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  findAll() {
    return [
      { 
        id: 'gaming', 
        name: 'Gaming Laptops',
        description: 'High-performance machines built for immersive gaming experiences.',
        slug: 'gaming'
      },
      { 
        id: 'business', 
        name: 'Business Laptops',
        description: 'Professional-grade laptops designed for productivity and reliability.',
        slug: 'business'
      },
      { 
        id: 'ultrabook', 
        name: 'Ultrabooks',
        description: 'Thin and light laptops offering the perfect balance of portability and performance.',
        slug: 'ultrabook'
      },
      { 
        id: 'creator', 
        name: 'Creator Laptops',
        description: 'Powerful machines optimized for video editing, 3D modeling, and design work.',
        slug: 'creator'
      },
      { 
        id: 'apple', 
        name: 'Apple MacBooks',
        description: 'Premium MacBooks with Apple Silicon for exceptional performance and battery life.',
        slug: 'apple'
      },
    ];
  }
} 