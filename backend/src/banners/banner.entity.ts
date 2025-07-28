import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  productId: string;

  @Column()
  ctaText: string;

  @Column()
  ctaLink: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: ['video', 'image'], default: 'image' })
  type: 'video' | 'image';

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}