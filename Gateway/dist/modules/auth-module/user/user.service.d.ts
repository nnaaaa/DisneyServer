import { UserEntity } from 'src/entities/user.entity';
import { UserBeFriendEntity } from 'src/entities/userBeFriend.entity';
import { UserRegisterDto } from 'src/modules/auth-module/auth/dtos/userRegister.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { UserBeFriendRepository } from 'src/repositories/userBeFriend.repository';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NewPasswordDto } from '../auth/dtos/forgetPassword.dto';
export declare class UserService {
    private userRepository;
    private userBeFriendRepository;
    readonly beFriendRelations: {
        leftUser: boolean;
        rightUser: boolean;
    };
    readonly userRelations: FindOptionsRelations<UserEntity>;
    constructor(userRepository: UserRepository, userBeFriendRepository: UserBeFriendRepository);
    save(user: UserEntity): Promise<UserEntity>;
    create(user: UserRegisterDto, verifyCode?: number): Promise<UserEntity>;
    updateOne(findCondition: FindOptionsWhere<UserEntity>, updateCondition: QueryDeepPartialEntity<UserEntity>): Promise<UserEntity>;
    findOne(findCondition: FindOptionsWhere<UserEntity>, selectFields?: FindOptionsSelect<UserEntity>): Promise<UserEntity>;
    changePassword(newPasswordDto: NewPasswordDto, user: UserEntity): Promise<void>;
    private getBefriendCombineKey;
    private saveBeFriend;
    private findBeFriend;
    private createBeFriend;
    addFriend(userId: string, friendId: string): Promise<UserBeFriendEntity>;
    acceptFriend(userId: string, friendId: string): Promise<UserBeFriendEntity>;
    blockFriend(userId: string, friendId: string): Promise<UserBeFriendEntity>;
}
