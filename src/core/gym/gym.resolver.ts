import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Gym } from '#src/core/gym/graphQL/gym.schema';
import { GymService } from '#src/core/gym/gym.service';
import { CreateGymInput } from '#src/core/gym/graphQL/create-gym.inputType';
import { UpdateGymArgs } from '#src/core/gym/graphQL/update-gym.args';
import { Training } from '#src/core/training/graphQL/training.schema';
import { GetGymArgs } from '#src/core/gym/graphQL/get-gym.args';

@Resolver(() => Gym)
export class GymResolver {
  constructor(private readonly gymService: GymService) {}

  @Mutation(() => Gym)
  async createGym(@Args('GymInput') gym: CreateGymInput) {
    return await this.gymService.save(gym);
  }

  @Mutation(() => Gym)
  async removeGym(@Args() gym: GetGymArgs) {
    return await this.gymService.removeOne({ where: gym });
  }

  @Mutation(() => Gym)
  async updateGym(@Args() gym: UpdateGymArgs) {
    return await this.gymService.updateOne(
      { where: { ID: gym.ID } },
      {
        name: gym.name,
        adminName: gym.adminName,
        adminPhoneNumber: gym.adminPhoneNumber,
        availableSlots: gym.availableSlots,
      },
    );
  }

  @Query(() => Gym, { name: 'Gym', nullable: true })
  async getGym(@Args() gym: GetGymArgs) {
    return await this.gymService.findOne({ where: gym });
  }

  @Query(() => [Gym], { name: 'Gyms', nullable: true })
  async getGyms(@Args() gyms: GetGymArgs) {
    return await this.gymService.find({ where: gyms });
  }

  @ResolveField('trainings', () => [Training], { nullable: true })
  async getTrainings(@Parent() gym: Gym) {
    return (
      await this.gymService.findOne({
        where: { ID: gym.ID },
        relations: { trainings: true },
      })
    ).trainings;
  }
}
