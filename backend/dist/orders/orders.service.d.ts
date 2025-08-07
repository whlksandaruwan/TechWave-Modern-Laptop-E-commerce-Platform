import { Repository } from 'typeorm';
import { Order, OrderItem, OrderStatus } from './orders.entity';
import { User } from '../auth/user.entity';
export declare class OrdersService {
    private ordersRepository;
    private orderItemsRepository;
    constructor(ordersRepository: Repository<Order>, orderItemsRepository: Repository<OrderItem>);
    createOrder(orderData: any, user: User): Promise<Order>;
    getOrders(userId?: string): Promise<Order[]>;
    getOrderById(id: string): Promise<Order>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;
    deleteOrder(id: string): Promise<void>;
    getOrdersByStatus(status: OrderStatus): Promise<Order[]>;
    getOrderStats(): Promise<any>;
    private generateOrderNumber;
}
