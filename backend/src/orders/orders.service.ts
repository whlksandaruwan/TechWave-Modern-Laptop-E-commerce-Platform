import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem, OrderStatus } from './orders.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async createOrder(orderData: any, user: User): Promise<Order> {
    const order = new Order();
    Object.assign(order, {
      ...orderData,
      user,
      orderNumber: this.generateOrderNumber(),
    });

    const savedOrder = await this.ordersRepository.save(order);
    return savedOrder;
  }

  async getOrders(userId?: string): Promise<Order[]> {
    const query = this.ordersRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.items', 'items')
      .orderBy('order.createdAt', 'DESC');

    if (userId) {
      query.where('user.id = :userId', { userId });
    }

    return await query.getMany();
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'items'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.getOrderById(id);
    order.status = status;
    return await this.ordersRepository.save(order);
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await this.getOrderById(id);
    await this.ordersRepository.remove(order);
  }

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: { status },
      relations: ['user', 'items'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderStats(): Promise<any> {
    const totalOrders = await this.ordersRepository.count();
    const pendingOrders = await this.ordersRepository.count({ where: { status: OrderStatus.PENDING } });
    const completedOrders = await this.ordersRepository.count({ where: { status: OrderStatus.DELIVERED } });
    
    const totalRevenue = await this.ordersRepository
      .createQueryBuilder('order')
      .select('SUM(order.totalAmount)', 'total')
      .where('order.status IN (:...statuses)', { 
        statuses: [OrderStatus.CONFIRMED, OrderStatus.SHIPPED, OrderStatus.DELIVERED] 
      })
      .getRawOne();

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: totalRevenue.total || 0,
    };
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
  }
} 