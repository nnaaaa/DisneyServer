import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(authUser: UserEntity): Promise<UserEntity>;
}
