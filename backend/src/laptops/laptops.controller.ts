import { LaptopsService } from './laptops.service';
import { Laptop } from './entities/laptop.entity';
import { Controller, Delete, Get, Param, Patch, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

@Controller('laptops')
export class LaptopsController {
  constructor(private readonly laptopsService: LaptopsService) {}

  @Get()
  async findAll() {
    try {
      return await this.laptopsService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch laptops', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const laptop = await this.laptopsService.findOne(id);
      if (!laptop) {
        throw new HttpException('Laptop not found', HttpStatus.NOT_FOUND);
      }
      return laptop;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed to fetch laptop', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() laptop: Partial<Laptop>) {
    try {
      return await this.laptopsService.create(laptop);
    } catch (error) {
      throw new HttpException('Failed to create laptop', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() laptop: Partial<Laptop>) {
    try {
      const updatedLaptop = await this.laptopsService.update(id, laptop);
      if (!updatedLaptop) {
        throw new HttpException('Laptop not found', HttpStatus.NOT_FOUND);
      }
      return updatedLaptop;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed to update laptop', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.laptopsService.remove(id);
      return { message: 'Laptop deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete laptop', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 