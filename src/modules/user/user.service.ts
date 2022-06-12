import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as Bcrypt from 'bcrypt'
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
import {
  NewPassordWithSMSDto,
  NewPasswordDto,
  NewPasswordWithComparationDto,
} from '../auth/dtos/forgetPassword.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: UserRepository,
    @InjectRepository(UserBeFriendEntity)
    private userBeFriendRepository: UserBeFriendRepository
  ) {}

  async create(user: UserRegisterDto, verifyCode: number) {
    const newUser = this.userRepository.create(user)
    const salt = await Bcrypt.genSalt()
    newUser.password = await Bcrypt.hash(newUser.password, salt)
    newUser.registerVerifyCode = verifyCode

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

  async changePassword(newPasswordDto: NewPasswordDto, user: UserEntity) {
    const updatePassword = async () => {
      const salt = await Bcrypt.genSalt()
      user.password = await Bcrypt.hash(newPasswordDto.newPassword, salt)
      user.changePwdVerfiyCode = null
      this.userRepository.save(user)
    }

    if (
      newPasswordDto.constructor.name === NewPasswordWithComparationDto.name
    ) {
      if (
        Bcrypt.compareSync(
          (newPasswordDto as NewPasswordWithComparationDto).oldPassword,
          user.password
        )
      ) {
        await updatePassword()
      } else throw new UnauthorizedException()
    } else if (newPasswordDto.constructor.name === NewPassordWithSMSDto.name) {
      await updatePassword()
    } else throw new BadRequestException()
  }

  async addFriend(userId: string, friendId: string) {
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
