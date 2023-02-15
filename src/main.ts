import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
    cors: true,
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
