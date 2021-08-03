// Copyright (c) 2021 Sendanor. All rights reserved.

import {isString, trim} from "../../../ts/modules/lodash";

export enum ColorScheme {
    DARK,
    LIGHT
}

/**
 * Use `ColorScheme.test()`
 * @param value
 * @deprecated
 */
export function isColorScheme (value: any): value is ColorScheme {
    switch (value) {

        case ColorScheme.DARK:
        case ColorScheme.LIGHT:
            return true;

        default:
            return false;
    }
}

/**
 * Use `ColorScheme.parse()`
 * @param value
 * @deprecated
 */
export function parseColorScheme (value: any): ColorScheme | undefined {

    if (ColorScheme.test(value)) return value;

    if (isString(value)) {
        value = trim(value).toUpperCase();
        switch (value) {

            case '0':
            case 'DARK'  : return ColorScheme.DARK;

            case '1':
            case 'LIGHT' : return ColorScheme.LIGHT;

            default      : return undefined;
        }
    }

    return undefined;

}

/**
 * Use `ColorScheme.stringify()`
 * @param value
 * @deprecated
 */
export function stringifyColorScheme (value: ColorScheme | undefined): string {
    if (value === undefined) return 'undefined';
    switch (value) {
        case ColorScheme.DARK  : return 'DARK';
        case ColorScheme.LIGHT : return 'LIGHT';
        default                : return `ColorScheme(${value})`;
    }
}

export namespace ColorScheme {

    export function test (value: any): value is ColorScheme {
        // noinspection JSDeprecatedSymbols
        return isColorScheme(value);
    }

    export function parse (value: any): ColorScheme | undefined {
        // noinspection JSDeprecatedSymbols
        return parseColorScheme(value);
    }

    export function stringify (value: ColorScheme | undefined): string {
        // noinspection JSDeprecatedSymbols
        return stringifyColorScheme(value);
    }

}
