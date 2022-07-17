'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ButtonSocketEvent =
    exports.ActionSocketEvent =
    exports.ReactSocketEvent =
    exports.EmojiSocketEvent =
    exports.MessageSocketEvent =
    exports.RoleSocketEvent =
    exports.ChannelSocketEvent =
    exports.ChannelCtgSocketEvent =
    exports.MemberSocketEvent =
    exports.GuildSocketEvent =
    exports.UserSocketEvent =
        void 0
var UserSocketEvent
;(function (UserSocketEvent) {
    UserSocketEvent['ONLINE'] = 'online'
    UserSocketEvent['UPDATE_PROFILE'] = 'updateProfile'
    UserSocketEvent['ADD_FRIEND'] = 'addFriend'
    UserSocketEvent['ACCEPT_FRIEND'] = 'acceptFriend'
    UserSocketEvent['BLOCK_FRIEND'] = 'blockFriend'
})((UserSocketEvent = exports.UserSocketEvent || (exports.UserSocketEvent = {})))
var GuildSocketEvent
;(function (GuildSocketEvent) {
    GuildSocketEvent['CREATE'] = 'create'
    GuildSocketEvent['UPDATE'] = 'update'
    GuildSocketEvent['GET_ONE'] = 'getOne'
    GuildSocketEvent['GET_JOINED'] = 'getJoined'
    GuildSocketEvent['DELETE'] = 'delete'
})((GuildSocketEvent = exports.GuildSocketEvent || (exports.GuildSocketEvent = {})))
var MemberSocketEvent
;(function (MemberSocketEvent) {
    MemberSocketEvent['GET_JOINED'] = 'getJoined'
    MemberSocketEvent['ONLINE'] = 'online'
    MemberSocketEvent['UPDATE'] = 'update'
    MemberSocketEvent['USER_JOIN'] = 'userJoin'
    MemberSocketEvent['BOT_JOIN'] = 'botJoin'
    MemberSocketEvent['LEAVE'] = 'leave'
})((MemberSocketEvent = exports.MemberSocketEvent || (exports.MemberSocketEvent = {})))
var ChannelCtgSocketEvent
;(function (ChannelCtgSocketEvent) {
    ChannelCtgSocketEvent['CREATE'] = 'create'
    ChannelCtgSocketEvent['UPDATE'] = 'update'
    ChannelCtgSocketEvent['DELETE'] = 'delete'
})(
    (ChannelCtgSocketEvent =
        exports.ChannelCtgSocketEvent || (exports.ChannelCtgSocketEvent = {}))
)
var ChannelSocketEvent
;(function (ChannelSocketEvent) {
    ChannelSocketEvent['CREATE'] = 'create'
    ChannelSocketEvent['UPDATE'] = 'update'
    ChannelSocketEvent['DELETE'] = 'delete'
    ChannelSocketEvent['ADD_MEMBER'] = 'addMember'
    ChannelSocketEvent['REMOVE_MEMBER'] = 'removeMember'
})((ChannelSocketEvent = exports.ChannelSocketEvent || (exports.ChannelSocketEvent = {})))
var RoleSocketEvent
;(function (RoleSocketEvent) {
    RoleSocketEvent['CREATE'] = 'create'
    RoleSocketEvent['UPDATE'] = 'update'
    RoleSocketEvent['DELETE'] = 'delete'
    RoleSocketEvent['ADD_TO_MEMBER'] = 'addToMember'
    RoleSocketEvent['REMOVE_FROM_MEMBER'] = 'removeFromMember'
    RoleSocketEvent['ADD_TO_CHANNEL'] = 'addToChannel'
    RoleSocketEvent['REMOVE_FROM_CHANNEL'] = 'removeFromChannel'
})((RoleSocketEvent = exports.RoleSocketEvent || (exports.RoleSocketEvent = {})))
var MessageSocketEvent
;(function (MessageSocketEvent) {
    MessageSocketEvent['FIND'] = 'find'
    MessageSocketEvent['CREATE'] = 'create'
    MessageSocketEvent['UPDATE'] = 'update'
    MessageSocketEvent['DELETE'] = 'delete'
})((MessageSocketEvent = exports.MessageSocketEvent || (exports.MessageSocketEvent = {})))
var EmojiSocketEvent
;(function (EmojiSocketEvent) {
    EmojiSocketEvent['CREATE'] = 'create'
    EmojiSocketEvent['UPDATE'] = 'update'
    EmojiSocketEvent['DELETE'] = 'delete'
})((EmojiSocketEvent = exports.EmojiSocketEvent || (exports.EmojiSocketEvent = {})))
var ReactSocketEvent
;(function (ReactSocketEvent) {
    ReactSocketEvent['CREATE'] = 'create'
    ReactSocketEvent['UPDATE'] = 'update'
    ReactSocketEvent['DELETE'] = 'delete'
})((ReactSocketEvent = exports.ReactSocketEvent || (exports.ReactSocketEvent = {})))
var ActionSocketEvent
;(function (ActionSocketEvent) {
    ActionSocketEvent['CREATE'] = 'create'
    ActionSocketEvent['UPDATE'] = 'update'
    ActionSocketEvent['DELETE'] = 'delete'
})((ActionSocketEvent = exports.ActionSocketEvent || (exports.ActionSocketEvent = {})))
var ButtonSocketEvent
;(function (ButtonSocketEvent) {
    ButtonSocketEvent['CREATE'] = 'create'
    ButtonSocketEvent['UPDATE'] = 'update'
    ButtonSocketEvent['DELETE'] = 'delete'
})((ButtonSocketEvent = exports.ButtonSocketEvent || (exports.ButtonSocketEvent = {})))
//# sourceMappingURL=event.js.map
