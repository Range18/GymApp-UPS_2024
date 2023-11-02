import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class ExceptionHandler implements GqlExceptionFilter {
  private readonly logger: Logger = new Logger('GraphQLError');
  catch(exception: unknown, host: ArgumentsHost) {
    const requestInfo = host.getArgByIndex(3);

    const operation = requestInfo['path']['typename']
      ? requestInfo['path']['typename']
      : 'Query';

    const method = requestInfo['path']['key'] ? requestInfo['path']['key'] : '';

    this.logger.log(`${operation} ${method} ${exception}`);
    return exception;
  }
}
