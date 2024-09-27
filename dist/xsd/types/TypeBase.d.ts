import * as schema from '../../schema';
import { QName } from '../QName';
import { State } from '../State';
import { Base, BaseClass } from './Base';
export declare class TypeBase extends Base {
    init(state: State): void;
    getOutType(schemaContext: schema.Context): schema.Type;
    /** Find parent type inheriting from a base type. */
    getParent(base: BaseClass, breakAtContent: boolean): TypeBase;
    getListType(): import("../Scope").NamedTypeMember[];
    id: string;
    name: string;
    parent: TypeBase | QName;
    qName: QName;
    surrogateKey: number;
    private static nextKey;
    outType: schema.Type;
    exported: boolean;
}
