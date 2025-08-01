import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem } from './cart.entity';
import { User } from '../auth/user.entity';
import { Laptop } from '../laptops/entities/laptop.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Laptop)
    private laptopRepository: Repository<Laptop>,
  ) {}

  async getOrCreateCart(user: User): Promise<Cart> {
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

  async addToCart(user: User, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.getOrCreateCart(user);
    const laptop = await this.laptopRepository.findOne({ where: { id: productId } });

    if (!laptop) {
      throw new NotFoundException('Product not found');
    }

    // Check if item already exists in cart
    let cartItem = await this.cartItemRepository.findOne({
      where: { cart: { id: cart.id }, productId },
    });

    if (cartItem) {
      // Update existing item
      cartItem.quantity += quantity;
      cartItem.totalPrice = cartItem.price * cartItem.quantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      // Create new item
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

  async updateCartItem(user: User, itemId: string, quantity: number): Promise<Cart> {
    const cart = await this.getOrCreateCart(user);
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: itemId, cart: { id: cart.id } },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (quantity <= 0) {
      await this.cartItemRepository.remove(cartItem);
    } else {
      cartItem.quantity = quantity;
      cartItem.totalPrice = cartItem.price * quantity;
      await this.cartItemRepository.save(cartItem);
    }

    return await this.updateCartTotals(cart.id);
  }

  async removeFromCart(user: User, itemId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(user);
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: itemId, cart: { id: cart.id } },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);
    return await this.updateCartTotals(cart.id);
  }

  async clearCart(user: User): Promise<Cart> {
    const cart = await this.getOrCreateCart(user);
    await this.cartItemRepository.delete({ cart: { id: cart.id } });
    return await this.updateCartTotals(cart.id);
  }

  async getCart(user: User): Promise<Cart> {
    return await this.getOrCreateCart(user);
  }

  private async updateCartTotals(cartId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return await this.cartRepository.save(cart);
  }
} 