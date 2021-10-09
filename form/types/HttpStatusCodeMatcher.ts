// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import HttpStatusCode, {
    isHttpStatusCode,
    parseHttpStatusCode,
    stringifyHttpStatusCode
} from "./HttpStatusCode";
import {
    hasNoOtherKeys,
    isArray, isArrayOf, isRegularObject,
    map,
    ParserCallback,
    StringifyCallback,
    TestCallbackNonStandard
} from "../../../ts/modules/lodash";


export interface HttpStatusCodeMatcher<T> {

    /**
     * This action will be processed if the response status code matches any of these status codes.
     */
    readonly statusCode : HttpStatusCode | HttpStatusCode[];

    readonly action     : T;

}


export function isHttpStatusCodeMatcher<T = any> (
    value    : any,
    isAction : TestCallbackNonStandard = (value) => !!value
): value is HttpStatusCodeMatcher<T> {
    return (
        !!value
        && isRegularObject(value)
        && ( isHttpStatusCode(value?.statusCode) || isArrayOf(value?.statusCode, isHttpStatusCode, 1) )
        && isAction(value?.action)
        && hasNoOtherKeys(value, ["statusCode", "action"])
    );
}

export function stringifyHttpStatusCodeMatcher<T = any> (
    value           : HttpStatusCodeMatcher<T>,
    stringifyAction : StringifyCallback | undefined = undefined
): string {

    if ( !isHttpStatusCodeMatcher(value) ) throw new TypeError(`Not HttpStatusCodeMatcher: ${value}`);

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
 * @param actionTester
 * @param actionParser
 * @fixme This method doesn't have support to parse actions
 */
export function parseHttpStatusCodeMatcher<T> (
    value        : any,
    actionTester : TestCallbackNonStandard | undefined,
    actionParser : ParserCallback<T> | undefined = undefined
): HttpStatusCodeMatcher<T> | undefined {

    if ( isRegularObject(value) && hasNoOtherKeys(value, ["statusCode", "action"]) ) {

        const statusCode = parseHttpStatusCode(value?.statusCode);
        const action     = actionParser ? actionParser( value?.action ) : value?.action;

        if ( statusCode === undefined || action === undefined ) {
            return undefined;
        }

        if (!isHttpStatusCode(statusCode)) {
            return undefined;
        }

        if ( actionTester && !actionTester(action) ) {
            return undefined;
        }

        return {statusCode, action};

    }

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

    export function parse<T> (
        value        : any,
        actionTester : TestCallbackNonStandard | undefined,
        actionParser : ParserCallback<T> | undefined = undefined
    ): HttpStatusCodeMatcher<T> | undefined {
        return parseHttpStatusCodeMatcher<T>(value, actionTester, actionParser);
    }

}

export default HttpStatusCodeMatcher;
