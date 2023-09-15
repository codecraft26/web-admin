import { NestFactory } from '@nestjs/core';
import { MailerModule } from './mailer.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';
async function bootstrap() {
  const app = await NestFactory.create(MailerModule);


  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);
  const queue = configService.get('RABBITMQ_MAILER_QUEUE');
  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();
