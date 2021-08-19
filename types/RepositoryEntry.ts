// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isNumber,
    isRegularObject,
    isString,
    TestCallbackNonStandard
} from "../../ts/modules/lodash";

export interface RepositoryEntry<T> {
    readonly data    : T;
    readonly id      : string;
    readonly version : number;
}

export function isRepositoryEntry<T> (
    value : any,
    isT   : TestCallbackNonStandard
): value is RepositoryEntry<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['data', 'id', 'version'])
        && isT(value?.data)
        && isString(value?.id)
        && isNumber(value?.version)
    );
}

export default RepositoryEntry;
