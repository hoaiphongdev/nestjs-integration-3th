import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppConfigService } from '@/@core/app-config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });
  const appConfigService = app.get(AppConfigService);
  const isDevelopment = appConfigService.isDevelopment;

  if (isDevelopment) {
    app.enableCors({
      origin: [appConfigService.app.clientUrl],
      credentials: true,
    });

    const config = new DocumentBuilder().setTitle('APP APIs').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = appConfigService.app.port;

  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));

  await app.listen(port || 4005);
}
bootstrap();
