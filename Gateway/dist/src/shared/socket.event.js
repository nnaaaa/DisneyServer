"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSocketEvent = exports.RoleSocketEvent = exports.ChannelSocketEvent = exports.ChannelCtgSocketEvent = exports.GuildSocketEvent = exports.UserSocketEvent = void 0;
var UserSocketEvent;
(function (UserSocketEvent) {
    UserSocketEvent["ONLINE"] = "online";
    UserSocketEvent["UPDATE_PROFILE"] = "updateProfile";
    UserSocketEvent["ADD_FRIEND"] = "addFriend";
    UserSocketEvent["ACCEPT_FRIEND"] = "acceptFriend";
    UserSocketEvent["BLOCK_FRIEND"] = "blockFriend";
})(UserSocketEvent = exports.UserSocketEvent || (exports.UserSocketEvent = {}));
var GuildSocketEvent;
(function (GuildSocketEvent) {
    GuildSocketEvent["CREATE"] = "create";
    GuildSocketEvent["UPDATE"] = "update";
    GuildSocketEvent["GET_ONE"] = "getOne";
    GuildSocketEvent["GET_JOINED"] = "getJoined";
    GuildSocketEvent["DELETE"] = "delete";
    GuildSocketEvent["JOIN_GUILD"] = "joinGuild";
    GuildSocketEvent["LEAVE_GUILD"] = "leaveGuild";
    GuildSocketEvent["MEMBER_UPDATE"] = "memberUpdate";
})(GuildSocketEvent = exports.GuildSocketEvent || (exports.GuildSocketEvent = {}));
var ChannelCtgSocketEvent;
(function (ChannelCtgSocketEvent) {
    ChannelCtgSocketEvent["CREATE"] = "create";
    ChannelCtgSocketEvent["UPDATE"] = "update";
    ChannelCtgSocketEvent["DELETE"] = "delete";
})(ChannelCtgSocketEvent = exports.ChannelCtgSocketEvent || (exports.ChannelCtgSocketEvent = {}));
var ChannelSocketEvent;
(function (ChannelSocketEvent) {
    ChannelSocketEvent["CREATE"] = "create";
    ChannelSocketEvent["UPDATE"] = "update";
    ChannelSocketEvent["DELETE"] = "delete";
})(ChannelSocketEvent = exports.ChannelSocketEvent || (exports.ChannelSocketEvent = {}));
var RoleSocketEvent;
(function (RoleSocketEvent) {
    RoleSocketEvent["CREATE"] = "create";
    RoleSocketEvent["UPDATE"] = "update";
    RoleSocketEvent["DELETE"] = "delete";
    RoleSocketEvent["ADD_TO_MEMBER"] = "addToMember";
    RoleSocketEvent["REMOVE_FROM_MEMBER"] = "removeFromMember";
    RoleSocketEvent["ADD_TO_CHANNEL"] = "addToChannel";
    RoleSocketEvent["REMOVE_FROM_CHANNEL"] = "removeFromChannel";
})(RoleSocketEvent = exports.RoleSocketEvent || (exports.RoleSocketEvent = {}));
var MessageSocketEvent;
(function (MessageSocketEvent) {
    MessageSocketEvent["CREATE"] = "create";
    MessageSocketEvent["UPDATE"] = "update";
    MessageSocketEvent["DELETE"] = "delete";
})(MessageSocketEvent = exports.MessageSocketEvent || (exports.MessageSocketEvent = {}));
//# sourceMappingURL=socket.event.js.map