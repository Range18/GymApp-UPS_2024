export namespace Exceptions {
  export enum CustomerExceptions {
    NotFound = 'Customer is not found',
    AlreadyExists = 'Customer is already exists',
  }

  export enum TrainingExceptions {
    NotFound = 'Training is not found',
  }

  export enum GymExceptions {
    NotFound = 'Gym is not found',
    SlotsLimit = 'Gym is full',
  }

  export enum PurchaseExceptions {
    NotFound = 'Purchase is not found',
  }
}
