import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/entities/user.entity'
import {
  FriendStatus,
  UserBeFriendEntity,
} from 'src/entities/userBeFriend.entity'
import { UserRegisterDto } from 'src/modules/auth/dtos/userRegister.dto'
import { UserRepository } from 'src/repositories/user.repository'
import { UserBeFriendRepository } from 'src/repositories/userBeFriend.repository'
import { FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { AddFriendDto } from './dtos/addFriend.dto'
import * as Bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: UserRepository,
    @InjectRepository(UserBeFriendEntity)
    private userBeFriendRepository: UserBeFriendRepository
  ) {}

  async create(user: UserRegisterDto) {
    const newUser = this.userRepository.create(user)
    const salt = await Bcrypt.genSalt()
    newUser.password = await Bcrypt.hash(newUser.password, salt)

    return await this.userRepository.save(newUser)
  }

  async updateOne(
    findCondition: FindOptionsWhere<UserEntity>,
    updateCondition: QueryDeepPartialEntity<UserEntity>
  ) {
    try {
      return await this.userRepository.update(findCondition, updateCondition)
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(findCondition: FindOptionsWhere<UserEntity>) {
    return await this.userRepository.findOne({
      relations: {
        friends: true,
        joinedChannels: true,
        sentMessages: true,
      },
      where: findCondition,
    })
  }

  async findAll() {
    return this.userRepository.find()
  }

  async addFriend(addFriendDto: AddFriendDto) {
    const { userId, friendId } = addFriendDto
    if (userId === friendId) throw new BadRequestException()

    const user = await this.findOne({ userId })
    const friend = await this.findOne({ userId: friendId })
    if (!user || !friend) throw new NotFoundException()

    const combineKey = userId + friendId

    const beFriendInThePast = await this.userBeFriendRepository.findOne({
      where: { id: combineKey },
    })

    if (beFriendInThePast) {
      beFriendInThePast.status = FriendStatus.PENDING
      return beFriendInThePast
    }

    const userBeFriend = this.userBeFriendRepository.create({
      id: combineKey,
    })
    userBeFriend.leftUser = user
    userBeFriend.rightUser = friend
    return await this.userBeFriendRepository.save(userBeFriend)
  }
}
