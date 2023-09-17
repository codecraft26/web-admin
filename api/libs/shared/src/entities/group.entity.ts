import { Entity ,PrimaryGeneratedColumn,Column,ManyToMany,ManyToOne,JoinTable} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('Group')
export class GroupEntity {


    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' }) // Admin of the group
    admin: UserEntity;
  
    @ManyToMany(() => UserEntity, { cascade: true }) // Members of the group
    @JoinTable()
    members: UserEntity[];
        
    }   