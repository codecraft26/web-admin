import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm';
import {  User } from "@app/shared";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 
  constructor(
    @InjectRepository(User)
  
    private readonly groupRepository:Repository<User>,
    private configService: ConfigService,

  ){
    super({

    
    secretOrKey:configService.get('JWT_SECRET'),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    });
    
  }


  async validate(payload){
    const {id}=payload
    const user=await this.groupRepository.findOne({where:{id:id}})
    if(!user){
     console.log('user not found')
    }
    return user;

  }


}