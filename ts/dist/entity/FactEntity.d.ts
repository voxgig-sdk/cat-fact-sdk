import { CatFactEntityBase } from '../CatFactEntityBase';
import type { CatFactSDK } from '../CatFactSDK';
import type { Control } from '../types';
import type { Fact, FactLoadMatch, FactListMatch } from '../CatFactTypes';
declare class FactEntity extends CatFactEntityBase<Fact> {
    constructor(client: CatFactSDK, entopts: any);
    make(this: FactEntity): FactEntity;
    load(this: any, reqmatch?: FactLoadMatch, ctrl?: Control): Promise<FactEntity>;
    list(this: any, reqmatch?: FactListMatch, ctrl?: Control): Promise<FactEntity[]>;
}
export { FactEntity };
