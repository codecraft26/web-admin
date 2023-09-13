import { TypeOrmModule } from "@nestjs/typeorm";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';



import { Roles } from "./role.enum";


  @Entity('user')
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    Name: string;
  
  
    @Column({ unique: true })
    email: string;
  
    @Column({ select: false })
    password: string;

    @Column({ default: "poweuser" })
    Roles:Roles

  }