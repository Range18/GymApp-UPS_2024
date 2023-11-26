import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GymEntity } from '../gym/gym.entity';
import { PurchaseEntity } from '../purchase/purchase.entity';
import { type TrainingType } from '#src/core/training/training.type';

@Entity('trainings')
export class TrainingEntity {
  @PrimaryGeneratedColumn('increment')
  readonly ID: number;

  @ManyToOne(() => GymEntity, (gym) => gym.trainings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gym' })
  gym: GymEntity;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.training, {
    onDelete: 'CASCADE',
  })
  purchases: PurchaseEntity[];

  @Column({ nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  type: TrainingType;
}
