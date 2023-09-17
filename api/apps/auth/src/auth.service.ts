import { Inject, Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthServiceInterface } from './interfaces/auth.service.interface';
import { UserRepositoryInterface } from '@app/shared';
import { JwtService } from '@nestjs/jwt';
import { NewUserDTO } from './dtos/new-user.dto';
import { UserEntity, UserJwt } from '@app/shared';
import * as bcrypt from 'bcrypt';
import { ExistingUserDTO } from './dtos/existing-user.dto';

@Injectable()
export class AuthService implements AuthServiceInterface {



  constructor(@Inject('UserRepositoryInterface') private readonly usersRepository: UserRepositoryInterface,
  
  private readonly jwtService: JwtService) { }




  async getUsers(): Promise<NewUserDTO[]> {
    const users = await this.usersRepository.findAll();
    return users.map(user => ({
      email: user.email,
      password: user.password,
      name: user.Name,
      role: user.Roles
    }));
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneById(id);
  }


  async findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findByCondition({
      where: { email },
      select: ['id', 'email', 'password', 'Name', 'Roles'],
    })
  }


  async findById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneById(id);
  }


  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(newUser: Readonly<NewUserDTO>): Promise<UserEntity> {
    const { name, email, password } = newUser;

    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const savedUser = await this.usersRepository.save({
      Name: name,
      email: email,
      password: hashedPassword,


    });
       
          

    delete savedUser.password;
    return savedUser;
  }


  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
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

  async login(existingUser: Readonly<ExistingUserDTO>) {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    const jwt = await this.jwtService.signAsync({ user });




    return { token: jwt, user };
  }


  async verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }> {
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


  
  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    
    

    
    
    try {
      const { user, exp } = await this.jwtService.verifyAsync(resetToken);
      if (exp < Date.now()) {
        throw new UnauthorizedException('Reset token has expired');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.updatePassword(user.id, hashedPassword);
    } catch (error) {
      throw new UnauthorizedException('Invalid reset token');
    }
  }



  //method to update password and after reset token will be deleted
  async updatePassword(id: number, password: string): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.findOneById(id);
    user.password = hashedPassword;
    return this.usersRepository.save(user);
  }

 

}
