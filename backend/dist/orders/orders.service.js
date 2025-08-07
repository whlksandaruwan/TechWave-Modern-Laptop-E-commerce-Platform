"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
let OrdersService = class OrdersService {
    constructor(ordersRepository, orderItemsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderItemsRepository = orderItemsRepository;
    }
    async createOrder(orderData, user) {
        const order = new orders_entity_1.Order();
        Object.assign(order, {
            ...orderData,
            user,
            orderNumber: this.generateOrderNumber(),
        });
        const savedOrder = await this.ordersRepository.save(order);
        return savedOrder;
    }
    async getOrders(userId) {
        const query = this.ordersRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.items', 'items')
            .orderBy('order.createdAt', 'DESC');
        if (userId) {
            query.where('user.id = :userId', { userId });
        }
        return await query.getMany();
    }
    async getOrderById(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['user', 'items'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async updateOrderStatus(id, status) {
        const order = await this.getOrderById(id);
        order.status = status;
        return await this.ordersRepository.save(order);
    }
    async deleteOrder(id) {
        const order = await this.getOrderById(id);
        await this.ordersRepository.remove(order);
    }
    async getOrdersByStatus(status) {
        return await this.ordersRepository.find({
            where: { status },
            relations: ['user', 'items'],
            order: { createdAt: 'DESC' },
        });
    }
    async getOrderStats() {
        const totalOrders = await this.ordersRepository.count();
        const pendingOrders = await this.ordersRepository.count({ where: { status: orders_entity_1.OrderStatus.PENDING } });
        const completedOrders = await this.ordersRepository.count({ where: { status: orders_entity_1.OrderStatus.DELIVERED } });
        const totalRevenue = await this.ordersRepository
            .createQueryBuilder('order')
            .select('SUM(order.totalAmount)', 'total')
            .where('order.status IN (:...statuses)', {
            statuses: [orders_entity_1.OrderStatus.CONFIRMED, orders_entity_1.OrderStatus.SHIPPED, orders_entity_1.OrderStatus.DELIVERED]
        })
            .getRawOne();
        return {
            totalOrders,
            pendingOrders,
            completedOrders,
            totalRevenue: totalRevenue.total || 0,
        };
    }
    generateOrderNumber() {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `ORD-${timestamp}-${random}`;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(orders_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map