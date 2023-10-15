import {  Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { NewUserDTO } from './dtos/new-user.dto';
import { User, UserJwt } from '@app/shared';
import { ExistingUserDTO } from './dtos/existing-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {



  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    private jwtService:JwtService
    
    ){
    
  }
  




  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
   
  }

  async getUserById(id: number): Promise<User> {
    const user=await this.userRepository.findOne({where:{id:id}})
    return user;

  }


  async findByEmail(email: string): Promise<User> {
    const user=await this.userRepository.findOne({where:{email:email}})
    return user;


  }


  


 

  async register(newUser: Readonly<NewUserDTO>): Promise<User> {
    const { name, email, password } = newUser;

    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    

    const savedUser = await this.userRepository.save({
      Name: name,
      email: email,
      password:password


    });
       
          

    // delete savedUser.password;
    return savedUser;
  }


  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return password===hashedPassword;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return user;
  }

  async login(existingUser: ExistingUserDTO) {
    const { email, password } = existingUser;
    const user1 = await this.validateUser(email, password);

    if (!user1) {
      throw new UnauthorizedException();
    }
    // delete user1.password;

    // const jwt = await this.jwtService.signAsync({ user });
    const jwt =await this.jwtService.signAsync({user1})








    return { token: jwt, user1 };
  }


  async verifyJwt(jwt: string): Promise<{ user: User; exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const { user, exp } = await this.jwtService.verifyAsync(jwt);
      return { user, exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserFromHeader(jwt: string): Promise<UserJwt> {
    if (!jwt) return;

    try {
      return this.jwtService.decode(jwt) as UserJwt;
    } catch (error) {
      throw new BadRequestException();
    }
  }


  
  // async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    
    

    
    
  //   try {
  //     const { user, exp } = await this.jwtService.verifyAsync(resetToken);
  //     if (exp < Date.now()) {
  //       throw new UnauthorizedException('Reset token has expired');
  //     }

  //     const hashedPassword = await bcrypt.hash(newPassword, 10);
  //     await this.updatePassword(user.id, hashedPassword);
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid reset token');
  //   }
  // }



  //method to update password and after reset token will be deleted
  async updatePassword(id: number, password: string): Promise<User> {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.findOneById(id);
    user.password =password;
    return this.userRepository.save(user);
  }

 

}
