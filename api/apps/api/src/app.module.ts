import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { SharedModule } from '@app/shared'
import { JwtMiddleware } from 'apps/auth/src/jwt.middleware';


@Module({
  imports: [

    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('MAILER_SERVICE', process.env.RABBITMQ_MAILER_QUEUE),
    SharedModule.registerRmq('GROUP_SERVICE', process.env.RABBITMQ_GROUP_QUEUE),
  ],
  controllers: [AppController],



})
export class AppModule {


 
  

 
}
