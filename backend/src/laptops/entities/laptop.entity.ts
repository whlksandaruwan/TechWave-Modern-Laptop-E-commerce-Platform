import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { WishlistItem } from './wishlist-item.entity';

interface LaptopSpecs {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  graphics: string;
  battery: string;
}

@Entity('laptops')
export class Laptop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'json' })
  specs: LaptopSpecs;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column()
  stock: number;

  @Column('uuid')
  categoryId: string;

  @Column({ default: false })
  featured: boolean;

  @OneToMany(() => WishlistItem, wishlistItem => wishlistItem.laptop)
  wishlistItems: WishlistItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 