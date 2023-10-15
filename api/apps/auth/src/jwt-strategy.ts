import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm';
import { Group, User } from "@app/shared";
import { Repository } from "typeorm";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
 
  constructor(
    @InjectRepository(User)
    private readonly groupRepository:Repository<User>
  ){
    super({
      secretOrKey:35355,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    });
  }


  async validate(payload){
    const {id}=payload
    const user=await this.groupRepository.findOne({where:{id:id}})
    if(!user){
      throw new UnauthorizedException("Login to access first")
    }
    return user;

  }


}