import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { ConfigService ,ConfigModule} from '@nestjs/config';
import { SharedService,SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
  SharedModule,
  ConfigModule,


    NestMailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),

        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        }
        
        ,
       
          
       
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailerController],
  providers: [{

    provide:'MailerServiceInterface',
    useClass:MailerService
  }


,
{
  provide:'sharedServiceInterface',
  useClass:SharedService
},

{

  provide:'ConfigServiceInterface',
  useClass:ConfigService
}
,MailerService



],
})
export class MailerModule {
  
}
