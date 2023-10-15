import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from '../entities/user.entity';
import { Group } from '../entities/group.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import the ConfigModule
    
    TypeOrmModule.forFeature([User,Group]),
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'niteg',
      database: 'postgres',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      
      
   })
  ],
})
export class PostgresDBModule {}