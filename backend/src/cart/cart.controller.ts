import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Request() req) {
    return await this.cartService.getCart(req.user);
  }

  @Post('items')
  async addToCart(
    @Body() body: { productId: string; quantity: number },
    @Request() req
  ) {
    return await this.cartService.addToCart(req.user, body.productId, body.quantity);
  }

  @Put('items/:id')
  async updateCartItem(
    @Param('id') itemId: string,
    @Body() body: { quantity: number },
    @Request() req
  ) {
    return await this.cartService.updateCartItem(req.user, itemId, body.quantity);
  }

  @Delete('items/:id')
  async removeFromCart(@Param('id') itemId: string, @Request() req) {
    return await this.cartService.removeFromCart(req.user, itemId);
  }

  @Delete()
  async clearCart(@Request() req) {
    return await this.cartService.clearCart(req.user);
  }
} 