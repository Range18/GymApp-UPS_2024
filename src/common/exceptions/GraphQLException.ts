import { GraphQLError } from 'graphql/error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Exceptions } from '#src/common/exceptions/exception.types';

type AllExceptions = typeof Exceptions & { HttpExceptions: HttpException };

export type ExceptionName<T extends keyof AllExceptions> =
  keyof AllExceptions[T];

export type ExceptionMessage<T extends keyof AllExceptions> =
  AllExceptions[T][ExceptionName<T>];

export class GraphQLException<
  T extends keyof AllExceptions,
> extends GraphQLError {
  constructor(statusCode: HttpStatus, type: T, message: ExceptionMessage<T>) {
    super(<string>(<unknown>message), {
      extensions: { type: type, statusCode: statusCode },
    });
  }
}
