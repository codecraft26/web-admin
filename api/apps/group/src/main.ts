import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { GroupModule } from './group.module';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(GroupModule);


  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_GROUP_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();


}
bootstrap();
