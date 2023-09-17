import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedService, UserEntity, UsersRepository } from '@app/shared';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { SharedModule } from '@app/shared';
import { PostgresDBModule } from '@app/shared/modules/postgresdb.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt-strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import {  GroupEntity } from '@app/shared/entities/group.entity';


@Module({
  imports: [

    JwtModule.registerAsync({

      imports: [SharedModule,ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),

    SharedModule,
    PostgresDBModule,
    MailerModule,

    TypeOrmModule.forFeature([
      UserEntity,
      GroupEntity
    ]),


  ],
  controllers: [AuthController],
  providers: [

      JwtGuard,
      JwtStrategy,
      {
        provide:'AuthServiceInterface',
        useClass:AuthService
      },
      {
        provide:'UserRepositoryInterface',
        useClass:UsersRepository
      },
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
})
export class AuthModule {}
