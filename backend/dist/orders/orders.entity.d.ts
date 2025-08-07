import { User } from '../auth/user.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare class Order {
    id: string;
    orderNumber: string;
    user: User;
    totalAmount: number;
    subtotal: number;
    tax: number;
    shippingCost: number;
    status: OrderStatus;
    shippingAddress: string;
    billingAddress: string;
    phoneNumber: string;
    notes: string;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class OrderItem {
    id: string;
    order: Order;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    totalPrice: number;
}
