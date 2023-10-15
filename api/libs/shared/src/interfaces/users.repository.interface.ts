import { User } from "../entities/user.entity";
export interface UsersRepositoryInterface {
    createUser(user: User): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findUserById(id: number): Promise<User>;
    updateUser(id: number, user: User): Promise<User>;
    deleteUser(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    
  
  }