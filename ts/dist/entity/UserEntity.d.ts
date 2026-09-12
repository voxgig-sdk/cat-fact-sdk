import { CatFactEntityBase } from '../CatFactEntityBase';
import type { CatFactSDK } from '../CatFactSDK';
import type { Control } from '../types';
import type { User, UserListMatch } from '../CatFactTypes';
declare class UserEntity extends CatFactEntityBase<User> {
    constructor(client: CatFactSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    list(this: any, reqmatch?: UserListMatch, ctrl?: Control): Promise<UserEntity[]>;
}
export { UserEntity };
