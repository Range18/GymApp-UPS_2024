import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrainingEntity } from '../training/training.entity';

@Entity('gyms')
export class GymEntity {
  @PrimaryGeneratedColumn('increment')
  readonly ID: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  adminName: string;

  @Column({ nullable: false })
  adminPhoneNumber: string;

  @Column({ nullable: false, default: 0 })
  availableSlots: number;

  @OneToMany(() => TrainingEntity, (training) => training.gym, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  trainings?: TrainingEntity[];
}
