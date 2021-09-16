// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isArrayOrUndefinedOf,
    isBooleanOrUndefined,
    isRegularObject,
    isSafeInteger,
    isString,
    TestCallbackNonStandard
} from "../../ts/modules/lodash";
import {
    isRepositoryMember,
    RepositoryMember
} from "../../ts/simpleRepository/types/RepositoryMember";

export interface ResponseDTO<T> {

    readonly id       : string;
    readonly version  : number;
    readonly payload  : T;
    readonly deleted ?: boolean;

    /**
     * Users who have active access to the resource (eg. joined in the Matrix room)
     */
    readonly members ?: RepositoryMember[];

}

export function isResponseDTO<T> (
    value: any,
    isT: TestCallbackNonStandard
): value is ResponseDTO<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'version',
            'payload',
            'deleted',
            'members'
        ])
        && isString(value?.id)
        && isBooleanOrUndefined(value?.deleted)
        && isSafeInteger(value?.version)
        && isArrayOrUndefinedOf<RepositoryMember>(value?.members, isRepositoryMember)
        && isT(value?.payload)
    );
}

export function stringifyResponseDTO<T> (
    value: ResponseDTO<T>,
    isT: TestCallbackNonStandard
): string {
    if ( !isResponseDTO<T>(value, isT) ) throw new TypeError(`Not ResponseDTO: ${value}`);
    return `ResponseDTO(${value})`;
}

export function parseResponseDTO<T> (
    value: any,
    isT: TestCallbackNonStandard
): ResponseDTO<T> | undefined {
    if ( isResponseDTO<T>(value, isT) ) return value;
    return undefined;
}

export default ResponseDTO;
