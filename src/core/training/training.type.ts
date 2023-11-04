import { registerEnumType } from '@nestjs/graphql';

export enum TrainingType {
  Individual = 'individual',
  Group = 'Group',
  WithCoach = 'With coach',
}

registerEnumType(TrainingType, {
  name: 'TrainingType',
  description: 'Type of training: individual, group, withCoach.',
});
