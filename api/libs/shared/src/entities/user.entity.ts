import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable
} from 'typeorm';
import {  Group } from "./group.entity";



import { Roles } from "./role.enum";


@Entity('user')
export class User {
  map(arg0: (user: any) => { id: any; name: any; email: any; password: any; }) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;


  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: Roles.ADMIN, type: "enum", enum: Roles })
  Roles: Roles
  @ManyToMany(() => Group,(group)=>group.id, { cascade: true })
  @JoinTable()
  groups: Group[];

}