export enum UserSocketEvent {
  ONLINE = 'online',
  ADD_FRIEND = 'addFriend',
  ACCEPT_FRIEND = 'acceptFriend',
  BLOCK_FRIEND = 'blockFriend',
}

export enum ChannelSocketEvent {
  MEMBER_ONLINE = 'online',
}

export enum GuildSocketEvent {
  UPDATE = 'update',
  DELETE = 'delete',
  USER_JOIN = 'join',
  USER_LEAVE = 'leave',
}
