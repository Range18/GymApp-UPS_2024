import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { PurchaseEntity } from '#src/core/purchase/purchase.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingService } from '#src/core/training/training.service';
import { CreatePurchaseInputType } from '#src/core/purchase/graphQL/create-purchase.inputType';
import { GymService } from '#src/core/gym/gym.service';

@Injectable()
export class PurchaseService extends BaseEntityService<PurchaseEntity> {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
    private readonly trainingService: TrainingService,

    private readonly gymService: GymService,
  ) {
    super(purchaseRepository);
  }

  async purchaseTraining(
    purchaseInput: CreatePurchaseInputType,
  ): Promise<PurchaseEntity> {
    const training = await this.trainingService.findOne({
      where: { ID: purchaseInput.trainingID },
      relations: { gym: true },
    });

    if (!training) {
      //TODO Exceptions
      throw Error('Training not found');
    }

    const gym = await this.gymService.findOne({
      where: { ID: training.gym.ID },
    });

    if (!gym) {
      //TODO Exceptions
      throw Error('Gym not found');
    }

    if (gym.freeSlots < 1) {
      //TODO Exceptions
      throw Error('no slots');
    }

    gym.freeSlots -= 1;
    await this.gymService.save(gym);

    const purchase = await this.save({
      training: training,
      customer: { ID: purchaseInput.customerID },
      gymIncome: training.price * 0.8,
      price: training.price,
    });

    return this.findOne({
      where: { ID: purchase.ID },
      relations: { customer: true, training: true },
    });
  }
}
