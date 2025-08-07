import { OrdersService } from './orders.service';
import { OrderStatus } from './orders.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(orderData: any, req: any): Promise<import("./orders.entity").Order>;
    getOrders(req: any): Promise<import("./orders.entity").Order[]>;
    getOrderById(id: string): Promise<import("./orders.entity").Order>;
    updateOrderStatus(id: string, body: {
        status: OrderStatus;
    }): Promise<import("./orders.entity").Order>;
    deleteOrder(id: string): Promise<void>;
    getOrdersByStatus(status: OrderStatus): Promise<import("./orders.entity").Order[]>;
    getOrderStats(): Promise<any>;
}
