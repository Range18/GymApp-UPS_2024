import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GymEntity } from '../gym/gym.entity';
import { PurchaseEntity } from '../purchase/purchase.entity';

@Entity('trainings')
export class TrainingEntity {
  @PrimaryGeneratedColumn('increment')
  readonly ID: number;

  @ManyToOne(() => GymEntity, (gym) => gym.trainings)
  @JoinColumn({ name: 'gym' })
  gym: GymEntity;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.training)
  purchases: PurchaseEntity[];

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  type: string;
}
