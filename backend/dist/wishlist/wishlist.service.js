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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./wishlist.entity");
const laptop_entity_1 = require("../laptops/entities/laptop.entity");
let WishlistService = class WishlistService {
    constructor(wishlistItemRepository, laptopRepository) {
        this.wishlistItemRepository = wishlistItemRepository;
        this.laptopRepository = laptopRepository;
    }
    async getWishlist(user) {
        return await this.wishlistItemRepository.find({
            where: { user: { id: user.id } },
            order: { createdAt: 'DESC' },
        });
    }
    async addToWishlist(user, productId) {
        const existingItem = await this.wishlistItemRepository.findOne({
            where: { user: { id: user.id }, productId },
        });
        if (existingItem) {
            throw new Error('Product already in wishlist');
        }
        const laptop = await this.laptopRepository.findOne({ where: { id: productId } });
        if (!laptop) {
            throw new common_1.NotFoundException('Product not found');
        }
        const wishlistItem = this.wishlistItemRepository.create({
            user,
            productId,
            productName: laptop.name,
            price: laptop.price,
            productImage: laptop.images[0] || '',
        });
        return await this.wishlistItemRepository.save(wishlistItem);
    }
    async removeFromWishlist(user, productId) {
        const wishlistItem = await this.wishlistItemRepository.findOne({
            where: { user: { id: user.id }, productId },
        });
        if (!wishlistItem) {
            throw new common_1.NotFoundException('Wishlist item not found');
        }
        await this.wishlistItemRepository.remove(wishlistItem);
    }
    async clearWishlist(user) {
        await this.wishlistItemRepository.delete({ user: { id: user.id } });
    }
    async isInWishlist(user, productId) {
        const wishlistItem = await this.wishlistItemRepository.findOne({
            where: { user: { id: user.id }, productId },
        });
        return !!wishlistItem;
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.WishlistItem)),
    __param(1, (0, typeorm_1.InjectRepository)(laptop_entity_1.Laptop)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map