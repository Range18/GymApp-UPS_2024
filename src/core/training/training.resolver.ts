import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TrainingService } from '#src/core/training/training.service';
import { Training } from '#src/core/training/graphQL/training.schema';
import { GetTrainingArgs } from '#src/core/training/graphQL/get-training.args';
import { CreateTraining } from '#src/core/training/graphQL/create-training.inputType';
import { Gym } from '#src/core/gym/graphQL/gym.schema';
import { GymService } from '#src/core/gym/gym.service';
import { UpdateTrainingArgs } from '#src/core/training/graphQL/update-training.args';

@Resolver((of) => Training)
export class TrainingResolver {
  constructor(
    private readonly trainingService: TrainingService,
    private readonly gymService: GymService,
  ) {}

  @Mutation((returns) => Training)
  async createTraining(@Args('training') training: CreateTraining) {
    return await this.trainingService.save({
      gym: { ID: training.gymId },
      price: training.price,
      type: training.type,
    });
  }

  @Mutation((returns) => Boolean)
  async removeTraining(@Args() training: GetTrainingArgs) {
    await this.trainingService.removeOne({ where: training });
    return true;
  }

  @Mutation((returns) => Training)
  async updateTraining(@Args() training: UpdateTrainingArgs) {
    return await this.trainingService.updateOne(
      { where: { ID: training.ID } },
      {
        gym: training.gym,
        price: training.price,
        type: training.type,
      },
    );
  }

  @Query((returns) => Training, { name: 'Training', nullable: true })
  async getTraining(@Args() training: GetTrainingArgs) {
    return await this.trainingService.findOne({ where: training });
  }

  @Query((returns) => [Training], { name: 'Trainings', nullable: true })
  async getTrainings(@Args() training: GetTrainingArgs) {
    return await this.trainingService.find({ where: training });
  }

  @ResolveField('gym', (returns) => Gym)
  async getGym(@Parent() training: Training) {
    return await this.gymService.findOne({
      where: { trainings: { ID: training.ID } },
      relations: { trainings: true },
    });
  }
}
