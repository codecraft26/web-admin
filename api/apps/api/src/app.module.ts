import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NestModule,MiddlewareConsumer } from '@nestjs/common';
import { CheckMiddleware, SharedModule } from '@app/shared'

@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq('MAILER_SERVICE', process.env.RABBITMQ_MAILER_QUEUE),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckMiddleware).forRoutes('*');
  }
}
