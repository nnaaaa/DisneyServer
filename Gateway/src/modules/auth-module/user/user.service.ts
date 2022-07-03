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
import { FriendStatus, UserBeFriendEntity } from 'src/entities/userBeFriend.entity'
import { UserRegisterDto } from 'src/modules/auth-module/auth/dtos/userRegister.dto'
import { UserRepository } from 'src/repositories/user.repository'
import { UserBeFriendRepository } from 'src/repositories/userBeFriend.repository'
import { FindOptionsSelect, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import {
    NewPassordWithSMSDto,
    NewPasswordDto,
    NewPasswordWithComparationDto,
} from '../auth/dtos/forgetPassword.dto'

@Injectable()
export class UserService {
    public readonly beFriendRelations = {
        leftUser: true,
        rightUser: true,
    }
    public readonly userRelations = {
        friends: this.beFriendRelations,
    }

    constructor(
        @InjectRepository(UserEntity) private userRepository: UserRepository,
        @InjectRepository(UserBeFriendEntity)
        private userBeFriendRepository: UserBeFriendRepository
    ) {}

    async save(user: UserEntity) {
        return await this.userRepository.save(user)
    }

    async create(user: UserRegisterDto, verifyCode?: number) {
        const newUser = this.userRepository.create(user)
        const salt = await Bcrypt.genSalt()
        newUser.password = await Bcrypt.hash(newUser.password, salt)

        if (verifyCode) {
            newUser.registerVerifyCode = verifyCode
        }

        return await this.save(newUser)
    }

    async updateOne(
        findCondition: FindOptionsWhere<UserEntity>,
        updateCondition: QueryDeepPartialEntity<UserEntity>
    ) {
        try {
            let user = await this.findOne(findCondition)

            if (!user) throw new NotFoundException()

            user = Object.assign(user, updateCondition)
            return await this.userRepository.save(user)
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async findOne(
        findCondition: FindOptionsWhere<UserEntity>,
        selectFields: FindOptionsSelect<UserEntity> = {}
    ) {
        return await this.userRepository.findOne({
            relations: this.userRelations,
            where: findCondition,
            select: selectFields,
        })
    }

    async changePassword(newPasswordDto: NewPasswordDto, user: UserEntity) {
        const updatePassword = async () => {
            const salt = await Bcrypt.genSalt()
            user.password = await Bcrypt.hash(newPasswordDto.newPassword, salt)
            user.changePwdVerfiyCode = null
            this.save(user)
        }

        if (newPasswordDto.constructor.name === NewPasswordWithComparationDto.name) {
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

    private getBefriendCombineKey(userId: string, friendId: string) {
        return userId > friendId ? userId + friendId : friendId + userId
    }
    private async saveBeFriend(beFriend: UserBeFriendEntity) {
        return await this.userBeFriendRepository.save(beFriend)
    }
    private async findBeFriend(userId: string, friendId: string) {
        if (userId === friendId) throw new BadRequestException()

        const user = await this.findOne({ userId })
        const friend = await this.findOne({ userId: friendId })
        if (!user || !friend) throw new NotFoundException()

        const combineKey = this.getBefriendCombineKey(userId, friendId)

        const beFriendInThePast = await this.userBeFriendRepository.findOne({
            relations: this.beFriendRelations,
            where: { id: combineKey },
        })
        return { user, friend, beFriendInThePast }
    }
    private async createBeFriend(user: UserEntity, friend: UserEntity) {
        const userBeFriend = this.userBeFriendRepository.create({
            id: this.getBefriendCombineKey(user.userId, friend.userId),
        })
        if (user.userId > friend.userId) {
            userBeFriend.leftUser = user
            userBeFriend.rightUser = friend
        } else {
            userBeFriend.leftUser = friend
            userBeFriend.rightUser = user
        }
        return userBeFriend
    }

    async addFriend(userId: string, friendId: string) {
        const { user, friend, beFriendInThePast } = await this.findBeFriend(
            userId,
            friendId
        )

        if (beFriendInThePast) {
            beFriendInThePast.status = FriendStatus.PENDING
            return await this.userBeFriendRepository.save(beFriendInThePast)
        }

        const userBeFriend = await this.createBeFriend(user, friend)
        return await this.saveBeFriend(userBeFriend)
    }

    async acceptFriend(userId: string, friendId: string) {
        const { beFriendInThePast } = await this.findBeFriend(userId, friendId)

        if (!beFriendInThePast) throw new NotFoundException()

        beFriendInThePast.status = FriendStatus.ACCEPTED
        return await this.saveBeFriend(beFriendInThePast)
    }

    async blockFriend(userId: string, friendId: string) {
        const { user, friend, beFriendInThePast } = await this.findBeFriend(
            userId,
            friendId
        )

        if (!beFriendInThePast) {
            beFriendInThePast.status = FriendStatus.BLOCKED
            return await this.saveBeFriend(beFriendInThePast)
        }

        const userBeFriend = await this.createBeFriend(user, friend)
        userBeFriend.status = FriendStatus.BLOCKED
        return await this.saveBeFriend(userBeFriend)
    }
}
