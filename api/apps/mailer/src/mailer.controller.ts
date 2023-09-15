import { Controller, Get } from '@nestjs/common';
import { MailerServices } from './mailer.service';
import { MessagePattern,Payload ,Ctx} from '@nestjs/microservices';
import { RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerServices,private readonly sharedService:SharedService) {}

  @MessagePattern({ cmd: 'send-mail' })
  getHello( @Ctx() context: RmqContext,@Payload() user: { email}) {
       

    this.sharedService.acknowledgeMessage(context);


    return this.mailerService.sendEmail(user.email)
  }
}
