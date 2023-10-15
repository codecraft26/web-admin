import {  EntityRepository, Repository } from "typeorm";

import { UsersRepositoryInterface } from "../interfaces/users.repository.interface";
import { User} from "../entities/user.entity";

EntityRepository(User)

export class UserRepository extends Repository<User> 
{
  

    
}