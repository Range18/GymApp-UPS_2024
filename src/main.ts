import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverConfig } from './common/configs/config';
import { ExceptionHandler } from '#src/common/exceptions/exception.handler';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: true,
  });

  app.useGlobalFilters(new ExceptionHandler());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(serverConfig.port);
}
bootstrap();
