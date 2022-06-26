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
    DELETE = "delete",
    JOIN_GUILD = "joinGuild",
    LEAVE_GUILD = "leaveGuild",
    MEMBER_UPDATE = "memberUpdate"
}
export declare enum ChannelCtgSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum ChannelSocketEvent {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
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
