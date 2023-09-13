import { NewUserDTO } from "../dtos/new-user.dto";

import { ExistingUserDTO } from "../dtos/existing-user.dto";
import { UserEntity,UserJwt } from "@app/shared";
export interface AuthServiceInterface {

    getUsers(): Promise<NewUserDTO[]>;
    getUserById(id: number): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
    hashPassword(password: string): Promise<string>;
    register(newUser: Readonly<NewUserDTO>): Promise<UserEntity>;
    doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<UserEntity>;
    login(existingUser: Readonly<ExistingUserDTO>): Promise<{
      token: string;
      user: UserEntity;
    }>;
    verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }>;
    getUserFromHeader(jwt: string): Promise<UserJwt>;



}