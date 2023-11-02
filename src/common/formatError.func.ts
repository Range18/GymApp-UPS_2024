import { GraphQLFormattedError } from 'graphql/error';

type OriginalError = {
  statusCode: number;
  message: string | string[];
  error: string;
};

export function formatError(error: GraphQLFormattedError) {
  const type = error?.extensions?.type
    ? error?.extensions?.type
    : error?.extensions?.code
    ? error?.extensions?.code
    : 'INTERNAL_SERVER_ERROR';

  const statusCode = error?.extensions?.statusCode
    ? error?.extensions?.statusCode
    : (<OriginalError>error?.extensions?.originalError)?.statusCode
    ? (<OriginalError>error?.extensions?.originalError)?.statusCode
    : 500;

  return {
    type: type,
    message: error.message,
    statusCode: statusCode,
    path: error.path,
    originalError: error?.extensions?.originalError,
  };
}
