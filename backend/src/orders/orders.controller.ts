import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderStatus } from './orders.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() orderData: any, @Request() req) {
    return await this.ordersService.createOrder(orderData, req.user);
  }

  @Get()
  async getOrders(@Request() req) {
    // Admin can see all orders, users see only their own
    const userId = req.user.role === 'admin' ? undefined : req.user.id;
    return await this.ordersService.getOrders(userId);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return await this.ordersService.getOrderById(id);
  }

  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() body: { status: OrderStatus }
  ) {
    return await this.ordersService.updateOrderStatus(id, body.status);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.ordersService.deleteOrder(id);
  }

  @Get('status/:status')
  async getOrdersByStatus(@Param('status') status: OrderStatus) {
    return await this.ordersService.getOrdersByStatus(status);
  }

  @Get('stats/overview')
  async getOrderStats() {
    return await this.ordersService.getOrderStats();
  }
} 