/* eslint-disable prettier/prettier */
import { Entity,PrimaryGeneratedColumn,Column,ManyToMany,ManyToOne,JoinTable} from "typeorm";
import { User} from "./user.entity";

@Entity('Group')
export class Group{


    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' }) // Admin of the group
    admin: User;
  
    @ManyToMany(() => User, { cascade: true }) // Members of the group
    @JoinTable()
    members: User[];
        
    }   