import { Controller, Get, Inject ,BadRequestException,Post,Req,UseInterceptors,Param,Body} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';



import { AuthGuard } from '@app/shared/guards/auth.guard';
import { UserRequest } from '@app/shared';
import { UserInterceptor } from '@app/shared/interceptors/user.interceptor';

import { UseGuards } from '@nestjs/common';
@Controller()
export class AppController {
  constructor(
    
    @Inject('AUTH_SERVICE') private readonly authService:ClientProxy, 
  ) {}

  @Get('users')
  async getUsers() {
    return this.authService.send(
      {
        cmd: 'all-user',
      },
      {},
    );
  }

  @Get('user/:id')
  async getUserByID(@Param('id') id: string) {
    return this.authService.send(
      {
        cmd: 'get-user',
        data: { id },
      },
      {


      
      },
    );
  }

  @Post('auth/register')
  async register(
    @Body('name') name: string,
   
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'register',
      },
      {
        name,
        email,
        password,
      },
    );
  }

  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      {
        email,
        password,
      },
    );
  }


  @Get('foo/:id')
  async getFoo(@Param('id') id: string) {
    return this.authService.send({
      cmd: 'get-presence',
    }, {id});
    }

  }




