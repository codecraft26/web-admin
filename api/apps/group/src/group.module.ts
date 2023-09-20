import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupEntity, SharedModule, UserEntity } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'apps/auth/src/auth.service';
import { UsersRepository } from '@app/shared';
import { MailerModule } from '@nestjs-modules/mailer';
import { SharedService } from '@app/shared';

@Module({
  imports: [



    SharedModule,
    ConfigModule
  ],
  controllers: [GroupController],
  providers: [ GroupService
  
  
  ],
})
export class GroupModule {}
