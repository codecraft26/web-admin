import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedService, User,Group, UserRepository } from '@app/shared';
import { ConfigService} from '@nestjs/config';
import { SharedModule } from '@app/shared';
import { PostgresDBModule } from '@app/shared/modules/postgresdb.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn:1090000,
          },
        };
      },
    }),

    SharedModule,
    PostgresDBModule,
    MailerModule,

    TypeOrmModule.forFeature([
      User,
      Group
    ]),
  


  ],
  controllers: [AuthController],
  providers: [

      JwtStrategy,
      PassportModule,
      {
        provide:'AuthServiceInterface',
        useClass:AuthService
      },
      {
        provide:'userRepoInterface',
        useClass:UserRepository
      }
      ,
    
      {
        provide:'sharedServiceInterface',
        useClass:SharedService
      }

      ,{
        provide:'mailerServiceInterface',
        useClass:MailerModule
      },
      {
        provide:'GroupServiceInterface',
        useClass:SharedService
      }



  ],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}
