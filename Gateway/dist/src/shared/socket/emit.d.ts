export declare enum UserSocketEmit {
    ONLINE = "online",
    UPDATE_PROFILE = "updateProfile",
    ADD_FRIEND = "addFriend",
    ACCEPT_FRIEND = "acceptFriend",
    BLOCK_FRIEND = "blockFriend"
}
export declare enum GuildSocketEmit {
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum MemberSocketEmit {
    JOIN = "join",
    LEAVE = "leave",
    UPDATE = "ipdate",
    ONLINE = "online"
}
export declare enum ChannelCtgSocketEmit {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum ChannelSocketEmit {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    ADD_MEMBER = "addMember",
    REMOVE_MEMBER = "removeMember"
}
export declare enum RoleSocketEmit {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    ADD_TO_MEMBER = "addToMember",
    REMOVE_FROM_MEMBER = "removeFromMember",
    ADD_TO_CHANNEL = "addToChannel",
    REMOVE_FROM_CHANNEL = "removeFromChannel"
}
export declare enum MessageSocketEmit {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum EmojiSocketEmit {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum ReactSocketEmit {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum ActionSocketEmit {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export declare enum ButtonSocketEmit {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    CLICK = "click"
}
