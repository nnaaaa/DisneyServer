"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectSocketEmit = exports.ButtonSocketEmit = exports.ActionSocketEmit = exports.ReactSocketEmit = exports.EmojiSocketEmit = exports.MessageSocketEmit = exports.RoleSocketEmit = exports.ChannelSocketEmit = exports.ChannelCtgSocketEmit = exports.MemberSocketEmit = exports.GuildSocketEmit = exports.UserSocketEmit = void 0;
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
})(GuildSocketEmit = exports.GuildSocketEmit || (exports.GuildSocketEmit = {}));
var MemberSocketEmit;
(function (MemberSocketEmit) {
    MemberSocketEmit["JOIN"] = "join";
    MemberSocketEmit["LEAVE"] = "leave";
    MemberSocketEmit["UPDATE"] = "ipdate";
    MemberSocketEmit["ONLINE"] = "online";
})(MemberSocketEmit = exports.MemberSocketEmit || (exports.MemberSocketEmit = {}));
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
    ChannelSocketEmit["ADD_MEMBER"] = "addMember";
    ChannelSocketEmit["REMOVE_MEMBER"] = "removeMember";
})(ChannelSocketEmit = exports.ChannelSocketEmit || (exports.ChannelSocketEmit = {}));
var RoleSocketEmit;
(function (RoleSocketEmit) {
    RoleSocketEmit["CREATE"] = "create";
    RoleSocketEmit["UPDATE"] = "update";
    RoleSocketEmit["DELETE"] = "delete";
    RoleSocketEmit["ADD_TO_MEMBER"] = "addToMember";
    RoleSocketEmit["REMOVE_FROM_MEMBER"] = "removeFromMember";
    RoleSocketEmit["ADD_TO_CHANNEL"] = "addToChannel";
    RoleSocketEmit["REMOVE_FROM_CHANNEL"] = "removeFromChannel";
})(RoleSocketEmit = exports.RoleSocketEmit || (exports.RoleSocketEmit = {}));
var MessageSocketEmit;
(function (MessageSocketEmit) {
    MessageSocketEmit["CREATE"] = "create";
    MessageSocketEmit["UPDATE"] = "update";
    MessageSocketEmit["DELETE"] = "delete";
})(MessageSocketEmit = exports.MessageSocketEmit || (exports.MessageSocketEmit = {}));
var EmojiSocketEmit;
(function (EmojiSocketEmit) {
    EmojiSocketEmit["CREATE"] = "create";
    EmojiSocketEmit["UPDATE"] = "update";
    EmojiSocketEmit["DELETE"] = "delete";
})(EmojiSocketEmit = exports.EmojiSocketEmit || (exports.EmojiSocketEmit = {}));
var ReactSocketEmit;
(function (ReactSocketEmit) {
    ReactSocketEmit["CREATE"] = "create";
    ReactSocketEmit["UPDATE"] = "update";
    ReactSocketEmit["DELETE"] = "delete";
})(ReactSocketEmit = exports.ReactSocketEmit || (exports.ReactSocketEmit = {}));
var ActionSocketEmit;
(function (ActionSocketEmit) {
    ActionSocketEmit["CREATE"] = "create";
    ActionSocketEmit["UPDATE"] = "update";
    ActionSocketEmit["DELETE"] = "delete";
})(ActionSocketEmit = exports.ActionSocketEmit || (exports.ActionSocketEmit = {}));
var ButtonSocketEmit;
(function (ButtonSocketEmit) {
    ButtonSocketEmit["CREATE"] = "create";
    ButtonSocketEmit["UPDATE"] = "update";
    ButtonSocketEmit["DELETE"] = "delete";
    ButtonSocketEmit["CLICK"] = "click";
})(ButtonSocketEmit = exports.ButtonSocketEmit || (exports.ButtonSocketEmit = {}));
var SelectSocketEmit;
(function (SelectSocketEmit) {
    SelectSocketEmit["CREATE"] = "create";
    SelectSocketEmit["UPDATE"] = "update";
    SelectSocketEmit["SELECT"] = "select";
})(SelectSocketEmit = exports.SelectSocketEmit || (exports.SelectSocketEmit = {}));
//# sourceMappingURL=emit.js.map