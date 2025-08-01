import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@Request() req) {
    return await this.wishlistService.getWishlist(req.user);
  }

  @Post(':productId')
  async addToWishlist(@Param('productId') productId: string, @Request() req) {
    return await this.wishlistService.addToWishlist(req.user, productId);
  }

  @Delete(':productId')
  async removeFromWishlist(@Param('productId') productId: string, @Request() req) {
    return await this.wishlistService.removeFromWishlist(req.user, productId);
  }

  @Delete()
  async clearWishlist(@Request() req) {
    return await this.wishlistService.clearWishlist(req.user);
  }

  @Get('check/:productId')
  async checkWishlist(@Param('productId') productId: string, @Request() req) {
    return { isInWishlist: await this.wishlistService.isInWishlist(req.user, productId) };
  }
} 