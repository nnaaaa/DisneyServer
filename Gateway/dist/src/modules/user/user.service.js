"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Bcrypt = require("bcrypt");
const user_entity_1 = require("../../entities/user.entity");
const userBeFriend_entity_1 = require("../../entities/userBeFriend.entity");
const user_repository_1 = require("../../repositories/user.repository");
const userBeFriend_repository_1 = require("../../repositories/userBeFriend.repository");
const forgetPassword_dto_1 = require("../auth/dtos/forgetPassword.dto");
let UserService = class UserService {
    constructor(userRepository, userBeFriendRepository) {
        this.userRepository = userRepository;
        this.userBeFriendRepository = userBeFriendRepository;
        this.beFriendRelations = {
            leftUser: true,
            rightUser: true,
        };
        this.userRelations = {
            friends: this.beFriendRelations,
        };
    }
    async save(user) {
        return await this.userRepository.save(user);
    }
    async create(user, verifyCode) {
        const newUser = this.userRepository.create(user);
        const salt = await Bcrypt.genSalt();
        newUser.password = await Bcrypt.hash(newUser.password, salt);
        if (verifyCode) {
            newUser.registerVerifyCode = verifyCode;
        }
        return await this.save(newUser);
    }
    async updateOne(findCondition, updateCondition) {
        try {
            let user = await this.findOne(findCondition);
            if (!user)
                throw new common_1.NotFoundException();
            user = Object.assign(user, updateCondition);
            return await this.userRepository.save(user);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async findOne(findCondition, selectFields = {}) {
        return await this.userRepository.findOne({
            relations: this.userRelations,
            where: findCondition,
            select: selectFields,
        });
    }
    async changePassword(newPasswordDto, user) {
        const updatePassword = async () => {
            const salt = await Bcrypt.genSalt();
            user.password = await Bcrypt.hash(newPasswordDto.newPassword, salt);
            user.changePwdVerfiyCode = null;
            this.save(user);
        };
        if (newPasswordDto.constructor.name === forgetPassword_dto_1.NewPasswordWithComparationDto.name) {
            if (Bcrypt.compareSync(newPasswordDto.oldPassword, user.password)) {
                await updatePassword();
            }
            else
                throw new common_1.UnauthorizedException();
        }
        else if (newPasswordDto.constructor.name === forgetPassword_dto_1.NewPassordWithSMSDto.name) {
            await updatePassword();
        }
        else
            throw new common_1.BadRequestException();
    }
    getBefriendCombineKey(userId, friendId) {
        return userId > friendId ? userId + friendId : friendId + userId;
    }
    async saveBeFriend(beFriend) {
        return await this.userBeFriendRepository.save(beFriend);
    }
    async findBeFriend(userId, friendId) {
        if (userId === friendId)
            throw new common_1.BadRequestException();
        const user = await this.findOne({ userId });
        const friend = await this.findOne({ userId: friendId });
        if (!user || !friend)
            throw new common_1.NotFoundException();
        const combineKey = this.getBefriendCombineKey(userId, friendId);
        const beFriendInThePast = await this.userBeFriendRepository.findOne({
            relations: this.beFriendRelations,
            where: { id: combineKey },
        });
        return { user, friend, beFriendInThePast };
    }
    async createBeFriend(user, friend) {
        const userBeFriend = this.userBeFriendRepository.create({
            id: this.getBefriendCombineKey(user.userId, friend.userId),
        });
        if (user.userId > friend.userId) {
            userBeFriend.leftUser = user;
            userBeFriend.rightUser = friend;
        }
        else {
            userBeFriend.leftUser = friend;
            userBeFriend.rightUser = user;
        }
        return userBeFriend;
    }
    async addFriend(userId, friendId) {
        const { user, friend, beFriendInThePast } = await this.findBeFriend(userId, friendId);
        if (beFriendInThePast) {
            beFriendInThePast.status = userBeFriend_entity_1.FriendStatus.PENDING;
            return await this.userBeFriendRepository.save(beFriendInThePast);
        }
        const userBeFriend = await this.createBeFriend(user, friend);
        return await this.saveBeFriend(userBeFriend);
    }
    async acceptFriend(userId, friendId) {
        const { beFriendInThePast } = await this.findBeFriend(userId, friendId);
        if (!beFriendInThePast)
            throw new common_1.NotFoundException();
        beFriendInThePast.status = userBeFriend_entity_1.FriendStatus.ACCEPTED;
        return await this.saveBeFriend(beFriendInThePast);
    }
    async blockFriend(userId, friendId) {
        const { user, friend, beFriendInThePast } = await this.findBeFriend(userId, friendId);
        if (!beFriendInThePast) {
            beFriendInThePast.status = userBeFriend_entity_1.FriendStatus.BLOCKED;
            return await this.saveBeFriend(beFriendInThePast);
        }
        const userBeFriend = await this.createBeFriend(user, friend);
        userBeFriend.status = userBeFriend_entity_1.FriendStatus.BLOCKED;
        return await this.saveBeFriend(userBeFriend);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(userBeFriend_entity_1.UserBeFriendEntity)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        userBeFriend_repository_1.UserBeFriendRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map