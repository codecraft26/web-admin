import { Request } from 'express';
import { Roles } from '../entities/role.enum';

export interface UserRequest extends Request{
user?:{

    id:number
    name:string
    email:string
    roles:Roles
    




}


}