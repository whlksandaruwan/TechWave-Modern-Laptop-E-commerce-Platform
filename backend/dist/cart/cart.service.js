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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./cart.entity");
const laptop_entity_1 = require("../laptops/entities/laptop.entity");
let CartService = class CartService {
    constructor(cartRepository, cartItemRepository, laptopRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.laptopRepository = laptopRepository;
    }
    async getOrCreateCart(user) {
        let cart = await this.cartRepository.findOne({
            where: { user: { id: user.id } },
            relations: ['items'],
        });
        if (!cart) {
            cart = this.cartRepository.create({ user });
            cart = await this.cartRepository.save(cart);
        }
        return cart;
    }
    async addToCart(user, productId, quantity) {
        const cart = await this.getOrCreateCart(user);
        const laptop = await this.laptopRepository.findOne({ where: { id: productId } });
        if (!laptop) {
            throw new common_1.NotFoundException('Product not found');
        }
        let cartItem = await this.cartItemRepository.findOne({
            where: { cart: { id: cart.id }, productId },
        });
        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.totalPrice = cartItem.price * cartItem.quantity;
            await this.cartItemRepository.save(cartItem);
        }
        else {
            cartItem = this.cartItemRepository.create({
                cart,
                productId,
                productName: laptop.name,
                price: laptop.price,
                quantity,
                totalPrice: laptop.price * quantity,
            });
            await this.cartItemRepository.save(cartItem);
        }
        return await this.updateCartTotals(cart.id);
    }
    async updateCartItem(user, itemId, quantity) {
        const cart = await this.getOrCreateCart(user);
        const cartItem = await this.cartItemRepository.findOne({
            where: { id: itemId, cart: { id: cart.id } },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        if (quantity <= 0) {
            await this.cartItemRepository.remove(cartItem);
        }
        else {
            cartItem.quantity = quantity;
            cartItem.totalPrice = cartItem.price * quantity;
            await this.cartItemRepository.save(cartItem);
        }
        return await this.updateCartTotals(cart.id);
    }
    async removeFromCart(user, itemId) {
        const cart = await this.getOrCreateCart(user);
        const cartItem = await this.cartItemRepository.findOne({
            where: { id: itemId, cart: { id: cart.id } },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        await this.cartItemRepository.remove(cartItem);
        return await this.updateCartTotals(cart.id);
    }
    async clearCart(user) {
        const cart = await this.getOrCreateCart(user);
        await this.cartItemRepository.delete({ cart: { id: cart.id } });
        return await this.updateCartTotals(cart.id);
    }
    async getCart(user) {
        return await this.getOrCreateCart(user);
    }
    async updateCartTotals(cartId) {
        const cart = await this.cartRepository.findOne({
            where: { id: cartId },
            relations: ['items'],
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        return await this.cartRepository.save(cart);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_entity_1.CartItem)),
    __param(2, (0, typeorm_1.InjectRepository)(laptop_entity_1.Laptop)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map