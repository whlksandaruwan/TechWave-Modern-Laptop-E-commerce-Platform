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
exports.LaptopsController = void 0;
const laptops_service_1 = require("./laptops.service");
const common_1 = require("@nestjs/common");
let LaptopsController = class LaptopsController {
    constructor(laptopsService) {
        this.laptopsService = laptopsService;
    }
    async findAll() {
        try {
            return await this.laptopsService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch laptops', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const laptop = await this.laptopsService.findOne(id);
            if (!laptop) {
                throw new common_1.HttpException('Laptop not found', common_1.HttpStatus.NOT_FOUND);
            }
            return laptop;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to fetch laptop', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(laptop) {
        try {
            return await this.laptopsService.create(laptop);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create laptop', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, laptop) {
        try {
            const updatedLaptop = await this.laptopsService.update(id, laptop);
            if (!updatedLaptop) {
                throw new common_1.HttpException('Laptop not found', common_1.HttpStatus.NOT_FOUND);
            }
            return updatedLaptop;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to update laptop', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            await this.laptopsService.remove(id);
            return { message: 'Laptop deleted successfully' };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete laptop', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LaptopsController = LaptopsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LaptopsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LaptopsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LaptopsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LaptopsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LaptopsController.prototype, "remove", null);
exports.LaptopsController = LaptopsController = __decorate([
    (0, common_1.Controller)('laptops'),
    __metadata("design:paramtypes", [laptops_service_1.LaptopsService])
], LaptopsController);
//# sourceMappingURL=laptops.controller.js.map