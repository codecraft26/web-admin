import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import the ConfigModule
    
    TypeOrmModule.forFeature([UserEntity]),
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'niteg',
      database: 'postgres',
      synchronize: true,
      entities: [UserEntity],
      
      
   })
  ],
})
export class PostgresDBModule {}