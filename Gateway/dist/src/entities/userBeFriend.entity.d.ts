import { UserEntity } from './user.entity';
export declare enum FriendStatus {
    ACCEPTED = "accepted",
    PENDING = "pending",
    BLOCKED = "blocked"
}
export declare class UserBeFriendEntity {
    id: string;
    status: FriendStatus;
    leftUser: UserEntity;
    rightUser: UserEntity;
}
