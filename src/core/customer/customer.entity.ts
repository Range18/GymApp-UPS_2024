import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PurchaseEntity } from '../purchase/purchase.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('increment')
  readonly ID: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  purchases?: PurchaseEntity[];
}
