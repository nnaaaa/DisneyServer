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
exports.GuildMemberEntity = void 0
const typeorm_1 = require('typeorm')
const channel_entity_1 = require('./channel.entity')
const guild_entity_1 = require('./guild.entity')
const role_entity_1 = require('./role.entity')
const user_entity_1 = require('./user.entity')
let GuildMemberEntity = class GuildMemberEntity {}
__decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)('uuid'), __metadata('design:type', String)],
    GuildMemberEntity.prototype,
    'guildMemberId',
    void 0
)
__decorate(
    [(0, typeorm_1.CreateDateColumn)(), __metadata('design:type', Date)],
    GuildMemberEntity.prototype,
    'joinAt',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)(), __metadata('design:type', String)],
    GuildMemberEntity.prototype,
    'nickname',
    void 0
)
__decorate(
    [(0, typeorm_1.Column)({ nullable: true }), __metadata('design:type', String)],
    GuildMemberEntity.prototype,
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
            }
        ),
        __metadata('design:type', user_entity_1.UserEntity),
    ],
    GuildMemberEntity.prototype,
    'user',
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
    GuildMemberEntity.prototype,
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
                onDelete: 'CASCADE',
            }
        ),
        (0, typeorm_1.JoinTable)(),
        __metadata('design:type', Array),
    ],
    GuildMemberEntity.prototype,
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
    GuildMemberEntity.prototype,
    'joinedChannels',
    void 0
)
GuildMemberEntity = __decorate([(0, typeorm_1.Entity)()], GuildMemberEntity)
exports.GuildMemberEntity = GuildMemberEntity
//# sourceMappingURL=guildMember.entity.js.map
