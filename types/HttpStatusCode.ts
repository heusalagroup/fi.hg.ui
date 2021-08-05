// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    indexOf,
    isArray,
    isNumber,
    isSafeInteger,
    isString,
    parseInteger,
    startsWith
} from "../../ts/modules/lodash";

/**
 * HTTP Status number or range of numbers.
 *
 * Can be:
 *
 *  - Single status code, eg, 200 OK as `200`
 *
 *  - Multiple status codes, eg, from 200 to 299 as `[200, 299]`
 */
export type HttpStatusCode = number | [number, number];

export function isHttpStatusCode (value: any): value is HttpStatusCode {
    return isNumber(value) || isArray(value, isNumber, 2, 2);
}

export function stringifyHttpStatusCode (value: HttpStatusCode): string {
    if ( !isHttpStatusCode(value) ) throw new TypeError(`Not HttpStatusCode: ${value}`);
    if (isArray(value)) {
        return `HttpStatusCode#${value[0]}-${value[1]}`;
    }
    return `HttpStatusCode#${value}`;
}

function parseHttpStatusCodeString (valueString : string, separator : string ) : HttpStatusCode | undefined {

    const index = indexOf(valueString, separator);

    if ( index < 0 ) {
        return parseInteger(valueString);
    }

    const start = parseInteger(valueString.substr(0, index));
    const end = parseInteger(valueString.substr(index+separator.length));

    if ( isSafeInteger(start) && isSafeInteger(end) ) {
        return [ start, end ];
    }

    return undefined;

}

export function parseHttpStatusCode (value: any): HttpStatusCode | undefined {

    if (isHttpStatusCode(value)) return value;

    if (isString(value)) {

        if (startsWith(value, 'HttpStatusCode#')) {
            value = value.substr('HttpStatusCode#'.length);
        }

        return (
            parseHttpStatusCodeString(value, '-')
            ?? parseHttpStatusCodeString(value, ' ')
            ?? parseHttpStatusCodeString(value, '\n')
            ?? parseHttpStatusCodeString(value, '..')
            ?? parseHttpStatusCodeString(value, '...')
            ?? parseHttpStatusCodeString(value, ',')
            ?? parseHttpStatusCodeString(value, '#')
            ?? parseHttpStatusCodeString(value, '&')
            ?? parseHttpStatusCodeString(value, ';')
            ?? parseHttpStatusCodeString(value, '+')
            ?? parseHttpStatusCodeString(value, '|')
            ?? parseHttpStatusCodeString(value, '/')
            ?? parseHttpStatusCodeString(value, '<')
            ?? parseHttpStatusCodeString(value, '>')
        );
    }

    if (isArray(value, isString, 2, 2)) {
        const [startString, endString] = value;
        const start = parseInteger(startString);
        const end = parseInteger(endString);
        if ( isSafeInteger(start) && isSafeInteger(end) ) {
            return [start, end];
        }
    }

    return undefined;

}

// eslint-disable-next-line
export namespace HttpStatusCode {

    export function test (value: any): value is HttpStatusCode {
        return isHttpStatusCode(value);
    }

    export function stringify (value: HttpStatusCode): string {
        return stringifyHttpStatusCode(value);
    }

    export function parse (value: any): HttpStatusCode | undefined {
        return parseHttpStatusCode(value);
    }

}

export default HttpStatusCode;
