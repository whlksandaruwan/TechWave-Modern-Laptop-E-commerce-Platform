import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  findAll() {
    // For now, return hardcoded categories. You'll likely fetch these from a database later.
    return [
      { id: 'gaming', name: 'Gaming Laptops' },
      { id: 'ultrabook', name: 'Ultrabooks' },
      { id: 'business', name: 'Business Laptops' },
      { id: 'creator', name: 'Creator Laptops' },
    ];
  }
} 