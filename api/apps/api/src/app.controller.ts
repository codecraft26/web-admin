
import { Controller, Get, Inject ,Post,Req,UseInterceptors,Param,Body, Delete, UseGuards} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@app/shared/guards/auth.gaurd';
import { UserInterceptor} from '@app/shared/interceptors/user.interceptor';
import { RoleGaurd } from '@app/shared/guards/role.gaurd';
@Controller()
export class AppController {
  constructor(
    
    @Inject('AUTH_SERVICE') private readonly authService:ClientProxy, 
    @Inject('MAILER_SERVICE') private readonly mailerService:ClientProxy ,
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

  @Get('test')
  async getTest() {
    return this.authService.send(
      {
        cmd: 'test',
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
    this.mailerService
    .send({
      cmd: 'send-mail',
    }, {email})
    .subscribe((res) => {
      console.log(res);
    });
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
    return this.mailerService.send({
      cmd: 'send-mail',
    }, {id});
    }


    @Post('auth/resetpassword')
    async resetPassword(
      @Body('resetToken') resetToken: string,
      @Body('newPassword') newPassword: string,
    ) {
      return this.authService.send(
        {
          cmd: 'reset-password',
        },
        {
          resetToken,
          newPassword,
        },
      );
    }

    @Delete('users')
    async deleteAllUser() {
      return this.authService.send(
        {
          cmd: 'delete-user',
        },
        {},
      );
    }

    @Get('users/:email')
    async getUserByEmail(@Param('email') email: string) {
      return this.authService.send(
        {
          cmd: 'find-email',
          data: email ,
        },
        {},
      );
    }


    @Get('test/:email')

    @UseGuards(AuthGuard, new RoleGaurd(['user']))

    @UseInterceptors(UserInterceptor)

    async getTest1(@Param('email') email: string) {
      return this.authService.send(
        {
          cmd: 'find-email',
        },
        {data:email},
      );
    }
  }




