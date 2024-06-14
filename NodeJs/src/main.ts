import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:['log','error']
  });
  app.enableCors();
  const server = await app.listen(4000);
  server.setTimeout(60000);
}

bootstrap();
