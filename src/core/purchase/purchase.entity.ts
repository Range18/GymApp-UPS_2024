import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainingEntity } from '../training/training.entity';
import { CustomerEntity } from '../customer/customer.entity';

@Entity('purchases')
export class PurchaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly ID: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer' })
  customer: CustomerEntity;

  @Column({ nullable: false })
  gymIncome: number;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => TrainingEntity, (training) => training.purchases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'training' })
  training: TrainingEntity;
}
