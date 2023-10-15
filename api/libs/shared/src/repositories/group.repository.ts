import {  EntityRepository, Repository } from "typeorm";


import { User} from "../entities/user.entity";
import { Group } from "../entities/group.entity";

EntityRepository(Group)

export class UserRepository extends Repository<Group>{
    
}