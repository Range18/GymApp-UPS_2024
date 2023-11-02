import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { PurchaseEntity } from '#src/core/purchase/purchase.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingService } from '#src/core/training/training.service';
import { CreatePurchaseInputType } from '#src/core/purchase/graphQL/create-purchase.inputType';
import { GymService } from '#src/core/gym/gym.service';
import { CustomerService } from '#src/core/customer/customer.service';
import { GraphQLException } from '#src/common/exceptions/GraphQLException';
import { Exceptions } from '#src/common/exceptions/exception.types';
import CustomerExceptions = Exceptions.CustomerExceptions;
import TrainingExceptions = Exceptions.TrainingExceptions;
import GymExceptions = Exceptions.GymExceptions;

@Injectable()
export class PurchaseService extends BaseEntityService<PurchaseEntity> {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
    private readonly trainingService: TrainingService,
    private readonly customerService: CustomerService,
    private readonly gymService: GymService,
  ) {
    super(purchaseRepository);
  }

  async purchaseTraining(
    purchaseInput: CreatePurchaseInputType,
  ): Promise<PurchaseEntity> {
    const customer = await this.customerService.findOne({
      where: { ID: purchaseInput.customerID },
    });

    if (!customer) {
      throw new GraphQLException(
        HttpStatus.NOT_FOUND,
        'CustomerExceptions',
        CustomerExceptions.NotFound,
      );
    }

    const training = await this.trainingService.findOne({
      where: { ID: purchaseInput.trainingID },
      relations: { gym: true },
    });

    if (!training) {
      throw new GraphQLException(
        HttpStatus.NOT_FOUND,
        'TrainingExceptions',
        TrainingExceptions.NotFound,
      );
    }

    const gym = await this.gymService.findOne({
      where: { ID: training.gym.ID },
    });

    if (!gym) {
      throw new GraphQLException(
        HttpStatus.NOT_FOUND,
        'GymExceptions',
        GymExceptions.NotFound,
      );
    }

    if (gym.freeSlots < 1) {
      throw new GraphQLException(
        HttpStatus.BAD_REQUEST,
        'GymExceptions',
        GymExceptions.SlotsLimit,
      );
    }

    gym.freeSlots -= 1;
    await this.gymService.save(gym);

    const purchase = await this.save({
      training: training,
      customer: customer,
      gymIncome: training.price * 0.8,
      price: training.price,
    });

    return this.findOne({
      where: { ID: purchase.ID },
      relations: { customer: true, training: true },
    });
  }
}
