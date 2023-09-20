import { BaseAbstractRepository } from "./base/base.abstract.repository";
import {GroupRepositoryInterface} from '../interfaces/group.repository.intrface'
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { GroupEntity } from "../entities/group.entity";



@Injectable()
export class UsersRepository
  extends BaseAbstractRepository<GroupEntity>
  implements GroupRepositoryInterface {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly GroupRepository: Repository<GroupEntity>,
  ) {
    super(GroupRepository);
  }
}