"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const laptop_entity_1 = require("./laptops/entities/laptop.entity");
const typeorm_1 = require("@nestjs/typeorm");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const laptopRepository = app.get((0, typeorm_1.getRepositoryToken)(laptop_entity_1.Laptop));
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
            images: ['https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            stock: 10,
            categoryId: 'apple',
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
            images: ['https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            stock: 15,
            categoryId: 'creator',
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
            images: ['https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            stock: 20,
            categoryId: 'business',
            featured: false
        },
        {
            name: 'ASUS ROG Strix G15',
            description: 'Gaming powerhouse with RTX graphics and high refresh rate display.',
            price: 1599.99,
            specs: {
                processor: 'AMD Ryzen 7 6800H',
                ram: '16GB DDR5',
                storage: '1TB NVMe SSD',
                display: '15.6" 144Hz FHD',
                graphics: 'NVIDIA RTX 4060',
                battery: 'Up to 8 hours'
            },
            images: ['https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
            stock: 25,
            categoryId: 'gaming',
            featured: true
        },
        {
            name: 'MacBook Air M2',
            description: 'Ultra-portable laptop with incredible battery life and performance.',
            price: 1199.99,
            specs: {
                processor: 'Apple M2',
                ram: '8GB Unified Memory',
                storage: '256GB SSD',
                display: '13.6" Liquid Retina',
                graphics: 'M2 Integrated GPU',
                battery: 'Up to 18 hours'
            },
            images: ['https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            stock: 30,
            categoryId: 'apple',
            featured: true
        },
        {
            name: 'MSI Creator Z16P',
            description: 'Professional creator laptop with studio-grade display and powerful specs.',
            price: 2299.99,
            specs: {
                processor: 'Intel Core i7-12700H',
                ram: '32GB DDR5',
                storage: '1TB NVMe SSD',
                display: '16" 4K Mini LED',
                graphics: 'NVIDIA RTX 4070',
                battery: 'Up to 10 hours'
            },
            images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            stock: 12,
            categoryId: 'creator',
            featured: true
        },
        {
            name: 'HP Pavilion Gaming 15',
            description: 'Affordable gaming laptop with solid performance for casual gamers.',
            price: 899.99,
            specs: {
                processor: 'AMD Ryzen 5 5600H',
                ram: '8GB DDR4',
                storage: '512GB SSD',
                display: '15.6" FHD IPS',
                graphics: 'NVIDIA GTX 1650',
                battery: 'Up to 6 hours'
            },
            images: ['https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            stock: 18,
            categoryId: 'gaming',
            featured: false
        },
        {
            name: 'Surface Laptop 5',
            description: 'Elegant ultrabook with premium build quality and excellent display.',
            price: 1299.99,
            specs: {
                processor: 'Intel Core i5-1235U',
                ram: '8GB LPDDR5',
                storage: '256GB SSD',
                display: '13.5" PixelSense',
                graphics: 'Intel Iris Xe',
                battery: 'Up to 17 hours'
            },
            images: ['https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            stock: 22,
            categoryId: 'ultrabook',
            featured: true
        },
        {
            name: 'MacBook Pro 14" M3 Max',
            description: 'The ultimate MacBook Pro with M3 Max chip for extreme performance.',
            price: 3499.99,
            specs: {
                processor: 'Apple M3 Max',
                ram: '32GB Unified Memory',
                storage: '1TB SSD',
                display: '14.2-inch Liquid Retina XDR',
                graphics: 'M3 Max Integrated GPU',
                battery: 'Up to 22 hours'
            },
            images: ['https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            stock: 8,
            categoryId: 'apple',
            featured: true
        },
        {
            name: 'MacBook Pro 13" M2',
            description: 'Compact MacBook Pro with M2 chip, perfect for professionals on the go.',
            price: 1299.99,
            specs: {
                processor: 'Apple M2',
                ram: '8GB Unified Memory',
                storage: '256GB SSD',
                display: '13.3-inch Retina',
                graphics: 'M2 Integrated GPU',
                battery: 'Up to 20 hours'
            },
            images: ['https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            stock: 15,
            categoryId: 'apple',
            featured: false
        }
    ];
    try {
        const existingLaptops = await laptopRepository.find();
        if (existingLaptops.length > 0) {
            await laptopRepository.remove(existingLaptops);
        }
        for (const laptop of laptops) {
            await laptopRepository.save(laptop);
        }
        console.log('Database seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map