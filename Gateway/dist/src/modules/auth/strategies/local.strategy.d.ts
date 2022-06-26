import { Strategy } from 'passport-local';
import { UserService } from 'src/modules/user/user.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private useService;
    constructor(useService: UserService);
    validate(account: string, password: string): Promise<import("../../../entities/user.entity").UserEntity>;
}
export {};
