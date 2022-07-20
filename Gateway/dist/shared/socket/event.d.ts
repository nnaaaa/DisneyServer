export declare enum UserSocketEvent {
    ONLINE = "online",
    UPDATE_PROFILE = "updateProfile",
    ADD_FRIEND = "addFriend",
    ACCEPT_FRIEND = "acceptFriend",
    BLOCK_FRIEND = "blockFriend"
}
export declare enum GuildSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    GET_ONE = "getOne",
    GET_JOINED = "getJoined",
    DELETE = "delete"
}
export declare enum MemberSocketEvent {
    GET_JOINED = "getJoined",
    ONLINE = "online",
    UPDATE = "update",
    USER_JOIN = "userJoin",
    BOT_JOIN = "botJoin",
    LEAVE = "leave"
}
export declare enum ChannelCtgSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum ChannelSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    ADD_MEMBER = "addMember",
    REMOVE_MEMBER = "removeMember"
}
export declare enum RoleSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    ADD_TO_MEMBER = "addToMember",
    REMOVE_FROM_MEMBER = "removeFromMember",
    ADD_TO_CHANNEL = "addToChannel",
    REMOVE_FROM_CHANNEL = "removeFromChannel"
}
export declare enum MessageSocketEvent {
    FIND = "find",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum EmojiSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum ReactSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum ActionSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum ButtonSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    CLICK = "click"
}
