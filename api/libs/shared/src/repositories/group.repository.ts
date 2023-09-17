import { Group } from "../entities/group.entity";
import { GroupRepositoryInterface } from "../interfaces/groups.repository.interface";
import { BaseAbstractRepository } from "./base/base.abstract.repository";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";



@Injectable()
export class UsersRepository
  extends BaseAbstractRepository<Group>
  implements GroupRepositoryInterface {
  constructor(
    @InjectRepository(Group)
    private readonly GroupRepository: Repository<Group>,
  ) {
    super(GroupRepository);
  }
}