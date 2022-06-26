"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSocketEmit = exports.ChannelSocketEmit = exports.ChannelCtgSocketEmit = exports.GuildSocketEmit = exports.UserSocketEmit = void 0;
var UserSocketEmit;
(function (UserSocketEmit) {
    UserSocketEmit["ONLINE"] = "online";
    UserSocketEmit["UPDATE_PROFILE"] = "updateProfile";
    UserSocketEmit["ADD_FRIEND"] = "addFriend";
    UserSocketEmit["ACCEPT_FRIEND"] = "acceptFriend";
    UserSocketEmit["BLOCK_FRIEND"] = "blockFriend";
})(UserSocketEmit = exports.UserSocketEmit || (exports.UserSocketEmit = {}));
var GuildSocketEmit;
(function (GuildSocketEmit) {
    GuildSocketEmit["UPDATE"] = "update";
    GuildSocketEmit["DELETE"] = "delete";
    GuildSocketEmit["MEMBER_JOIN"] = "join";
    GuildSocketEmit["MEMBER_LEAVE"] = "leave";
    GuildSocketEmit["MEMBER_UPDATE"] = "memberUpdate";
})(GuildSocketEmit = exports.GuildSocketEmit || (exports.GuildSocketEmit = {}));
var ChannelCtgSocketEmit;
(function (ChannelCtgSocketEmit) {
    ChannelCtgSocketEmit["CREATE"] = "create";
    ChannelCtgSocketEmit["UPDATE"] = "update";
    ChannelCtgSocketEmit["DELETE"] = "delete";
})(ChannelCtgSocketEmit = exports.ChannelCtgSocketEmit || (exports.ChannelCtgSocketEmit = {}));
var ChannelSocketEmit;
(function (ChannelSocketEmit) {
    ChannelSocketEmit["CREATE"] = "create";
    ChannelSocketEmit["UPDATE"] = "update";
    ChannelSocketEmit["DELETE"] = "delete";
    ChannelSocketEmit["USER_JOIN"] = "join";
    ChannelSocketEmit["USER_LEAVE"] = "leave";
    ChannelSocketEmit["USER_UPDATE"] = "memberUpdate";
    ChannelSocketEmit["USER_ONLINE"] = "online";
    ChannelSocketEmit["ADD_ROLE"] = "addRole";
    ChannelSocketEmit["REMOVE_ROLE"] = "removeRole";
})(ChannelSocketEmit = exports.ChannelSocketEmit || (exports.ChannelSocketEmit = {}));
var RoleSocketEmit;
(function (RoleSocketEmit) {
    RoleSocketEmit["CREATE"] = "create";
    RoleSocketEmit["UPDATE"] = "update";
    RoleSocketEmit["DELETE"] = "delete";
})(RoleSocketEmit = exports.RoleSocketEmit || (exports.RoleSocketEmit = {}));
//# sourceMappingURL=socket.emit.js.map