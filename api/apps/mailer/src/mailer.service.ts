import { Injectable } from '@nestjs/common';
import { idText } from 'typescript';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailerServices {


  constructor(private readonly mailerService:MailerService) {}
  getHello(): string {
    return 'Hello World!';
  }

 async sendEmail(email:string):Promise<string>{


const url=`http://localhost:5000/auth/verify-email/${idText}`;


await this.mailerService.sendMail({

  to:email,
  from:"noreply@gmail.com",
  subject:"Verify your email",
  text:"Verify your email",
  html:`<a href="${url}">
  
  please click here  change your password

  ${url}
  
  </a>`,
 
  context:{
    url
  }
});

  return `Email sent to ${email}`;




  



 }
}
