export enum UserSocketEvent {
    GET_PROFILE = 'getProfile',
    UPDATE_PROFILE = 'updateProfile',
    ADD_FRIEND = 'addFriend',
    ACCEPT_FRIEND = 'acceptFriend',
    BLOCK_FRIEND = 'blockFriend',
}

export enum GuildSocketEvent{
    CREATE = 'create',
    UPDATE = 'update',
    GET_ONE = 'getOne',
    GET_JOINED = 'getJoined',
    DELETE = 'delete',
    JOIN_GUILD = 'joinGuild',
    LEAVE_GUILD = 'leaveGuild',
    MEMBER_UPDATE = 'memberUpdate',
}

export enum ChannelCtgSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum ChannelSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    // JOIN_CHANNEL = 'joinChannel',
    // LEAVE_CHANNEL = 'leaveChannel',
    // MEMBER_UPDATE = 'memberUpdate',
    // ONLINE = 'online',
}

export enum RoleSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}