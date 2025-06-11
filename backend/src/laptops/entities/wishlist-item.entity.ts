import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Laptop } from './laptop.entity';

@Entity('wishlist_item')
export class WishlistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  addedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Laptop, { onDelete: 'CASCADE' })
  laptop: Laptop;

  @Column()
  laptopId: string;
} 