import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Laptop } from './laptops/entities/laptop.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const laptopRepository = app.get<Repository<Laptop>>(getRepositoryToken(Laptop));

  // Sample laptops data
  const laptops = [
    {
      name: 'MacBook Pro 16" M3 Pro',
      description: 'Powerful laptop with M3 Pro chip, perfect for professionals and developers.',
      price: 2499.99,
      specs: {
        processor: 'Apple M3 Pro',
        ram: '18GB Unified Memory',
        storage: '512GB SSD',
        display: '16-inch Liquid Retina XDR',
        graphics: 'M3 Pro Integrated GPU',
        battery: 'Up to 22 hours'
      },
      images: ['https://example.com/macbook-pro-1.jpg'],
      stock: 10,
      categoryId: '1', // You'll need to create categories first
      featured: true
    },
    {
      name: 'Dell XPS 15',
      description: 'Premium Windows laptop with stunning display and powerful performance.',
      price: 1999.99,
      specs: {
        processor: 'Intel Core i9-13900H',
        ram: '32GB DDR5',
        storage: '1TB NVMe SSD',
        display: '15.6" 4K OLED Touch',
        graphics: 'NVIDIA RTX 4070',
        battery: 'Up to 13 hours'
      },
      images: ['https://example.com/dell-xps-1.jpg'],
      stock: 15,
      categoryId: '1',
      featured: true
    },
    {
      name: 'Lenovo ThinkPad X1 Carbon',
      description: 'Business-class laptop known for durability and excellent keyboard.',
      price: 1799.99,
      specs: {
        processor: 'Intel Core i7-1365U',
        ram: '16GB LPDDR5',
        storage: '512GB SSD',
        display: '14" 4K IPS',
        graphics: 'Intel Iris Xe',
        battery: 'Up to 15 hours'
      },
      images: ['https://example.com/thinkpad-1.jpg'],
      stock: 20,
      categoryId: '1',
      featured: false
    }
  ];

  try {
    // Delete all existing laptops
    const existingLaptops = await laptopRepository.find();
    if (existingLaptops.length > 0) {
      await laptopRepository.remove(existingLaptops);
    }
    
    // Insert new data
    for (const laptop of laptops) {
      await laptopRepository.save(laptop);
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 