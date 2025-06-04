import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Laptop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  processor: string;

  @Column()
  ram: string;

  @Column()
  storage: string;

  @Column()
  display: string;

  @Column({ default: true })
  inStock: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 