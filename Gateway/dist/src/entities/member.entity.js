'use strict'
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v)
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.MemberEntity = void 0
const constant_1 = require('../shared/utils/constant')
const typeorm_1 = require('typeorm')
const bot_entity_1 = require('./bot.entity')
const channel_entity_1 = require('./channel.entity')
const guild_entity_1 = require('./guild.entity')
const message_entity_1 = require('./message.entity')
const react_entity_1 = require('./react.entity')
const role_entity_1 = require('./role.entity')
const user_entity_1 = require('./user.entity')
let MemberEntity = class MemberEntity {}
__decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)('uuid'), __metadata('design:type', String)],
    MemberEntity.prototype,
    'memberId',
    void 0
)
__decorate(
    [(0, typeorm_1.CreateDateColumn)(), __metadata('design:type', Date)],
    MemberEntity.prototype,
    'joinAt',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)(), __metadata('design:type', String)],
    MemberEntity.prototype,
    'nickname',
    void 0
)
__decorate(
    [
        (0, typeorm_1.Column)({ default: constant_1.Constant.userAvatar }),
        __metadata('design:type', String),
    ],
    MemberEntity.prototype,
    'avatarUrl',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => user_entity_1.UserEntity,
            (type) => type.joinedGuilds,
            {
                onDelete: 'CASCADE',
                nullable: true,
            }
        ),
        __metadata('design:type', user_entity_1.UserEntity),
    ],
    MemberEntity.prototype,
    'user',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => bot_entity_1.BotEntity,
            (type) => type.joinedGuilds,
            {
                nullable: true,
            }
        ),
        __metadata('design:type', bot_entity_1.BotEntity),
    ],
    MemberEntity.prototype,
    'bot',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => guild_entity_1.GuildEntity,
            (type) => type.members
        ),
        __metadata('design:type', guild_entity_1.GuildEntity),
    ],
    MemberEntity.prototype,
    'guild',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToMany)(
            () => role_entity_1.RoleEntity,
            (type) => type.members,
            {
                cascade: true,
            }
        ),
        (0, typeorm_1.JoinTable)(),
        __metadata('design:type', Array),
    ],
    MemberEntity.prototype,
    'roles',
    void 0
)
__decorate(
    [
        (0, typeorm_1.ManyToMany)(
            () => channel_entity_1.ChannelEntity,
            (type) => type.members
        ),
        __metadata('design:type', Array),
    ],
    MemberEntity.prototype,
    'joinedChannels',
    void 0
)
__decorate(
    [
        (0, typeorm_1.OneToMany)(
            () => message_entity_1.MessageEntity,
            (type) => type.author,
            { cascade: true }
        ),
        __metadata('design:type', Array),
    ],
    MemberEntity.prototype,
    'sentMessages',
    void 0
)
__decorate(
    [
        (0, typeorm_1.OneToMany)(
            () => react_entity_1.ReactEntity,
            (type) => type.author,
            { cascade: true }
        ),
        __metadata('design:type', Array),
    ],
    MemberEntity.prototype,
    'sentReacts',
    void 0
)
MemberEntity = __decorate([(0, typeorm_1.Entity)()], MemberEntity)
exports.MemberEntity = MemberEntity
//# sourceMappingURL=member.entity.js.map
