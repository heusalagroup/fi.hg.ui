// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    indexOf,
    isArray, isArrayOf,
    isSafeInteger, isSafeIntegerOf,
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

function isIntegerBetweenHttpStatusRange (value: any) : value is number {
    return isSafeIntegerOf(value, 100, 599);
}

export function isHttpStatusCode (value: any): value is HttpStatusCode {

    if (isArrayOf(value, isIntegerBetweenHttpStatusRange, 2, 2)) {
        return value[0] < value[1];
    }

    return isIntegerBetweenHttpStatusRange(value);
}

export function stringifyHttpStatusCode (value: HttpStatusCode): string {
    if ( !isHttpStatusCode(value) ) throw new TypeError(`Not HttpStatusCode: ${value}`);
    if ( isArray(value) ) {
        return `HttpStatusCode#${value[0]}-${value[1]}`;
    }
    return `HttpStatusCode#${value}`;
}

export function parseHttpStatusCodeString (valueString : string, separator : string ) : HttpStatusCode | undefined {

    const index = valueString.indexOf(separator);

    if ( index < 0 ) {
        const parsedValue = parseInteger(valueString);
        return isIntegerBetweenHttpStatusRange(parsedValue) ? parsedValue : undefined;
    }

    const start = parseInteger(valueString.substr(0, index));
    const end = parseInteger(valueString.substr(index + separator.length ));

    if ( isIntegerBetweenHttpStatusRange(start) && isIntegerBetweenHttpStatusRange(end) ) {
        return normalizeStatusCodeRange(start, end );
    }

    return undefined;

}

function normalizeStatusCodeRange (
    start : number,
    end   : number
) : [number,number] {
    if (start < end) {
        return [start, end];
    } else {
        return [end, start];
    }
}

export function parseHttpStatusCode (value: any): HttpStatusCode | undefined {

    if (isHttpStatusCode(value)) {
        if (isArray(value)) {
            return normalizeStatusCodeRange(value[0], value[1]);
        }
        return value;
    }

    if (isString(value)) {

        if (startsWith(value, 'HttpStatusCode#')) {
            value = value.substr( 'HttpStatusCode#'.length );
        }

        return (
            parseHttpStatusCodeString(value, '-')
            ?? parseHttpStatusCodeString(value, ' ')
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
            ?? parseHttpStatusCodeString(value, '\t')
            ?? parseHttpStatusCodeString(value, '\n')
        );

    }

    if (isArrayOf(value, undefined, 2, 2)) {
        const [startString, endString] = value;
        const start = parseInteger(startString);
        const end = parseInteger(endString);
        if ( isIntegerBetweenHttpStatusRange(start) && isIntegerBetweenHttpStatusRange(end) ) {
            return normalizeStatusCodeRange(start, end);
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
