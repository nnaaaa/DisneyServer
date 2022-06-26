export enum UserSocketEmit {
    ONLINE = 'online',
    UPDATE_PROFILE = 'updateProfile',
    ADD_FRIEND = 'addFriend',
    ACCEPT_FRIEND = 'acceptFriend',
    BLOCK_FRIEND = 'blockFriend',
}

export enum GuildSocketEmit {
    UPDATE = 'update',
    DELETE = 'delete',
    MEMBER_JOIN = 'join',
    MEMBER_LEAVE = 'leave',
    MEMBER_UPDATE = 'memberUpdate',
}

export enum ChannelCtgSocketEmit {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum ChannelSocketEmit {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',

    USER_JOIN = 'join',
    USER_LEAVE = 'leave',
    USER_UPDATE = 'memberUpdate',
    USER_ONLINE = 'online',

    ADD_ROLE = 'addRole',
    REMOVE_ROLE = 'removeRole',
    // ADD_MEMBER = 'addMember',
    // REMOVE_MEMBER = 'removeMember',
}

export enum RoleSocketEmit {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}
