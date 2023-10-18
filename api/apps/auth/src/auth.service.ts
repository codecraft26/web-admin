import {  Injectable, ConflictException, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { NewUserDTO } from './dtos/new-user.dto';
import { User, UserJwt, UserRepository } from '@app/shared';
import { ExistingUserDTO } from './dtos/existing-user.dto';
import { InjectRepository, getCustomRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {



  constructor(
    
@InjectRepository(User)
private readonly userRepository:Repository<User>
,    private jwtService:JwtService
    
    ){}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
              }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find(); // Use the `find` method to fetch all users from the User entity.
  }

  async getUserById(id: number): Promise<User> {
    const user=await this.userRepository.findOne({where:{id:id}})
    return user;

  }


  async findByEmail(email: string):Promise<User>{
    const user=await this.userRepository.findOne({where:{email:email}})

    if(!user){
      throw new BadRequestException("User not found")
    }
    return  user;
  }

  async register(newUser: Readonly<NewUserDTO>): Promise<User> {
    const { name, email, password } = newUser;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const savedUser = await this.userRepository.save({
      Name: name,
      email: email,
      password:password
    });
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
    const user = await this.validateUser(email, password);
      console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }

    const jwt =await this.jwtService.signAsync({user});
    return { token: jwt, user };
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




  async updatePassword(id: number, password: string): Promise<User> {
    const user = await this.userRepository.findOne({where:{id:id}}  );
    user.password =password;
    return this.userRepository.save(user);
  }
}
