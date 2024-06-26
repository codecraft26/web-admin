import { Controller, Get, Inject,Param,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SharedService } from '@app/shared';
import { Ctx, MessagePattern, RmqContext,Payload } from '@nestjs/microservices';
import { ExistingUserDTO } from './dtos/existing-user.dto';
import { NewUserDTO } from './dtos/new-user.dto';
import { JwtGuard } from './jwt.guard';
import { MailerModule } from 'apps/mailer/src/mailer.module';
import { MailerService } from '@nestjs-modules/mailer';



@Controller()
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface') private readonly authService: AuthService,
    @Inject('sharedServiceInterface') private readonly sharedService: SharedService,
    
    
    
    ) {}


    @MessagePattern({cmd:'all-user'})
    async getUsers(@Ctx() context: RmqContext) {
      this.sharedService.acknowledgeMessage(context);

      return this.authService.getUsers;
    }
    @MessagePattern({ cmd: 'find-email' })
    async findByEmail(
      @Ctx() context: RmqContext,
      @Payload() payload: { email: string },
    ) {
      this.sharedService.acknowledgeMessage(context);
  
      return this.authService.findByEmail(payload.email);
    }

    @MessagePattern({ cmd: 'get-user' })
    async getUserById(
      @Ctx() context: RmqContext,
      @Payload() user: { id: number },
    ){
      this.sharedService.acknowledgeMessage(context);
  
      return this.authService.getUserById(user.id);
    }
  
    @MessagePattern({ cmd: 'register' })
    async register(@Ctx() context: RmqContext, @Payload() newUser: NewUserDTO) {
      this.sharedService.acknowledgeMessage(context);

      // write code for send email
    



  
      return this.authService.register(newUser);
    }
  
    @MessagePattern({ cmd: 'login' })
    async login(
      @Ctx() context: RmqContext,
      @Payload() existingUser: ExistingUserDTO,
    ) {
      this.sharedService.acknowledgeMessage(context);
  
      return this.authService.login(existingUser);
    }
  
    @MessagePattern({ cmd: 'verify-jwt' })
    @UseGuards(JwtGuard)
    async verifyJwt(
      @Ctx() context: RmqContext,
      @Payload() payload: { jwt: string },
    ) {
      this.sharedService.acknowledgeMessage(context);
  
      return this.authService.verifyJwt(payload.jwt);
    }


    @MessagePattern({ cmd: 'decode-jwt' })
  async decodeJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getUserFromHeader(payload.jwt);
  }



    @MessagePattern({ cmd: 'test' })
    async getTest(@Ctx() context: RmqContext) {
      this.sharedService.acknowledgeMessage(context);
  
      return "heloo";
    }
  

    @MessagePattern({ cmd: 'get-presence' })
    async getFoo(@Ctx() context: RmqContext, @Payload() user: { id: number }) {
      this.sharedService.acknowledgeMessage(context);
  
      return { foo:user.id  };
    }

 

    

}
