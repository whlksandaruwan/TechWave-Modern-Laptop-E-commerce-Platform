import { LaptopsService } from './laptops.service';
import { Laptop } from './laptop.entity';
import { Controller, Delete, Get, Param, Patch, Post, Body } from '@nestjs/common';

@Controller('laptops')
export class LaptopsController {
  constructor(private readonly laptopsService: LaptopsService) {}

  @Get()
  findAll() {
    return this.laptopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laptopsService.findOne(+id);
  }

  @Post()
  create(@Body() laptop: Partial<Laptop>) {
    return this.laptopsService.create(laptop);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() laptop: Partial<Laptop>) {
    return this.laptopsService.update(+id, laptop);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.laptopsService.remove(+id);
  }
} 