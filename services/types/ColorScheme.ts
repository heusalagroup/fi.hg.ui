import {isString, trim} from "../../../ts/modules/lodash";

export enum ColorScheme {
    DARK,
    LIGHT
}

export function isColorScheme (value: any): value is ColorScheme {
    switch (value) {

        case ColorScheme.DARK:
        case ColorScheme.LIGHT:
            return true;

        default:
            return false;
    }
}

export function parseColorScheme (value: any): ColorScheme | undefined {

    if (isColorScheme(value)) return value;

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

export function stringifyColorScheme (value: ColorScheme | undefined): string {

    if (value === undefined) return 'undefined';

    switch (value) {
        case ColorScheme.DARK  :
            return 'DARK';
        case ColorScheme.LIGHT :
            return 'LIGHT';
        default                      :
            return `WindowColorScheme(${value})`;
    }
}
