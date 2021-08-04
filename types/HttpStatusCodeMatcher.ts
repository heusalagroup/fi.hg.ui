// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import HttpStatusCode, { isHttpStatusCode, stringifyHttpStatusCode } from "./HttpStatusCode";
import { isArray, map } from "../../ts/modules/lodash";

export interface HttpStatusCodeMatcher<T> {

    /**
     * This action will be processed if the response status code matches any of these status codes.
     */
    readonly statusCode : HttpStatusCode | HttpStatusCode[];

    readonly action     : T;

}

export function isHttpStatusCodeMatcher<T = any> (
    value  : any,
    isAction : ((value: any) => boolean) = (value) => !!value
): value is HttpStatusCodeMatcher<T> {
    return (
        !!value
        && ( isHttpStatusCode(value?.statusCode) || isArray(value?.statusCode, isHttpStatusCode, 1) )
        && isAction(value?.action)
    );
}

export function stringifyHttpStatusCodeMatcher<T = any> (
    value           : HttpStatusCodeMatcher<T>,
    stringifyAction : ((value: any) => string) | undefined = undefined
): string {

    if (stringifyAction !== undefined) {

        if (isArray(value.statusCode)) {
            return `HttpStatusCodeMatcher(${map(value.statusCode, stringifyHttpStatusCode).join(', ')}, ${stringifyAction(value?.action)})`;
        }

        return `HttpStatusCodeMatcher(${stringifyHttpStatusCode(value.statusCode)}, ${stringifyAction(value?.action)})`;
    }

    if (isArray(value.statusCode)) {
        return `HttpStatusCodeMatcher(${map(value.statusCode, stringifyHttpStatusCode).join(', ')})`;
    } else {
        return `HttpStatusCodeMatcher(${stringifyHttpStatusCode(value.statusCode)})`;
    }

}

/**
 *
 * @param value
 * @fixme This method doesn't have support to parse actions
 */
export function parseHttpStatusCodeMatcher<T> (
    value: any
): HttpStatusCodeMatcher<T> | undefined {
    if ( isHttpStatusCodeMatcher<T>(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace HttpStatusCodeMatcher {

    /**
     * @param value
     * @param isAction
     */
    export function test<T = any> (
        value    : any,
        isAction : ((value: any) => boolean) = (value) => !!value
    ): value is HttpStatusCodeMatcher<T> {
        return isHttpStatusCodeMatcher<T>(value, isAction);
    }

    export function stringify<T = any> (
        value           : HttpStatusCodeMatcher<T>,
        stringifyAction : ((value: any) => string) | undefined = undefined
    ): string {
        return stringifyHttpStatusCodeMatcher<T>(value, stringifyAction);
    }

    export function parse<T> (value: any): HttpStatusCodeMatcher<T> | undefined {
        return parseHttpStatusCodeMatcher<T>(value);
    }

}

export default HttpStatusCodeMatcher;
