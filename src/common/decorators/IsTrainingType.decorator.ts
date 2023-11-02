import { registerDecorator, ValidationOptions } from 'class-validator';
import { TrainingType } from '#src/core/training/training.type';

export const trainingType: readonly TrainingType[] = [
  'individual',
  'group',
  'coach',
] as const;
export function IsTypeOf(
  type: string | 'TrainingType',
  validationOptions?: ValidationOptions,
) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [type],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (type === 'TrainingType') {
            return trainingType.includes(value);
          }

          return typeof value === type;
        },

        defaultMessage(): string {
          if (type === 'TrainingType') {
            return `${propertyName} property must be a ${type}: (${trainingType.join(
              ', ',
            )})`;
          }
          return `${propertyName} property must be a ${type}`;
        },
      },
    });
  };
}
