"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaptopsModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const laptops_controller_1 = require("./laptops.controller");
const laptops_service_1 = require("./laptops.service");
const laptop_entity_1 = require("./entities/laptop.entity");
const wishlist_item_entity_1 = require("./entities/wishlist-item.entity");
const common_1 = require("@nestjs/common");
let LaptopsModule = class LaptopsModule {
};
exports.LaptopsModule = LaptopsModule;
exports.LaptopsModule = LaptopsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([laptop_entity_1.Laptop, wishlist_item_entity_1.WishlistItem])],
        controllers: [laptops_controller_1.LaptopsController],
        providers: [laptops_service_1.LaptopsService],
    })
], LaptopsModule);
//# sourceMappingURL=laptops.module.js.map