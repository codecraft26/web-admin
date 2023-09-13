import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedService, UserEntity, UsersRepository } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import { SharedModule } from '@app/shared';
import { PostgresDBModule } from '@app/shared/modules/postgresdb.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt-strategy';


@Module({
  imports: [

    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),

    SharedModule,
    PostgresDBModule,

    TypeOrmModule.forFeature([
      UserEntity,
      
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



  ],
})
export class AuthModule {}
