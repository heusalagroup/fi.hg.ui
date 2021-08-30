// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys, isArrayOf,
    isBooleanOrUndefined,
    isRegularObject,
    isSafeInteger,
    isString,
    TestCallbackNonStandard
} from "../../ts/modules/lodash";
import ResponseDTO, { isResponseDTO } from "./ResponseDTO";

export interface ResponseListDTO<T> {
    readonly payload  : ResponseDTO<T>[];
}

export function isResponseListDTO<T> (
    value : any,
    isT   : TestCallbackNonStandard
): value is ResponseListDTO<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'payload'
        ])
        && isArrayOf<T>(value?.payload, item => isResponseDTO<T>(item, i2 => isT(i2)))
    );
}

export function stringifyResponseListDTO<T> (
    value: ResponseListDTO<T>,
    isT: TestCallbackNonStandard
): string {
    if ( !isResponseListDTO<T>(value, isT) ) throw new TypeError(`Not ResponseListDTO: ${value}`);
    return `ResponseListDTO(${value})`;
}

export function parseResponseListDTO<T> (
    value: any,
    isT: TestCallbackNonStandard
): ResponseListDTO<T> | undefined {
    if ( isResponseListDTO<T>(value, isT) ) return value;
    return undefined;
}

export default ResponseListDTO;
