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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
let CategoriesController = class CategoriesController {
    findAll() {
        return [
            {
                id: 'gaming',
                name: 'Gaming Laptops',
                description: 'High-performance machines built for immersive gaming experiences.',
                slug: 'gaming'
            },
            {
                id: 'business',
                name: 'Business Laptops',
                description: 'Professional-grade laptops designed for productivity and reliability.',
                slug: 'business'
            },
            {
                id: 'ultrabook',
                name: 'Ultrabooks',
                description: 'Thin and light laptops offering the perfect balance of portability and performance.',
                slug: 'ultrabook'
            },
            {
                id: 'creator',
                name: 'Creator Laptops',
                description: 'Powerful machines optimized for video editing, 3D modeling, and design work.',
                slug: 'creator'
            },
            {
                id: 'apple',
                name: 'Apple MacBooks',
                description: 'Premium MacBooks with Apple Silicon for exceptional performance and battery life.',
                slug: 'apple'
            },
        ];
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories')
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map