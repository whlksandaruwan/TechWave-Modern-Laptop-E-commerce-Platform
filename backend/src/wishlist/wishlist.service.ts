import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistItem } from './wishlist.entity';
import { User } from '../auth/user.entity';
import { Laptop } from '../laptops/entities/laptop.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistItem)
    private wishlistItemRepository: Repository<WishlistItem>,
    @InjectRepository(Laptop)
    private laptopRepository: Repository<Laptop>,
  ) {}

  async getWishlist(user: User): Promise<WishlistItem[]> {
    return await this.wishlistItemRepository.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
    });
  }

  async addToWishlist(user: User, productId: string): Promise<WishlistItem> {
    // Check if already in wishlist
    const existingItem = await this.wishlistItemRepository.findOne({
      where: { user: { id: user.id }, productId },
    });

    if (existingItem) {
      throw new Error('Product already in wishlist');
    }

    const laptop = await this.laptopRepository.findOne({ where: { id: productId } });

    if (!laptop) {
      throw new NotFoundException('Product not found');
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

  async removeFromWishlist(user: User, productId: string): Promise<void> {
    const wishlistItem = await this.wishlistItemRepository.findOne({
      where: { user: { id: user.id }, productId },
    });

    if (!wishlistItem) {
      throw new NotFoundException('Wishlist item not found');
    }

    await this.wishlistItemRepository.remove(wishlistItem);
  }

  async clearWishlist(user: User): Promise<void> {
    await this.wishlistItemRepository.delete({ user: { id: user.id } });
  }

  async isInWishlist(user: User, productId: string): Promise<boolean> {
    const wishlistItem = await this.wishlistItemRepository.findOne({
      where: { user: { id: user.id }, productId },
    });

    return !!wishlistItem;
  }
} 