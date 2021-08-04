// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { isFunction } from "../../ts/modules/lodash";

export interface FormCancelCallback {
    (): void;
}

export function isFormCancelCallback (value: any): value is FormCancelCallback {
    return isFunction(value);
}

export function stringifyFormCancelCallback (value: FormCancelCallback): string {
    return `FormCancelCallback(${value})`;
}

export function parseFormCancelCallback (value: any): FormCancelCallback | undefined {
    if ( isFormCancelCallback(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace FormCancelCallback {

    export function test (value: any): value is FormCancelCallback {
        return isFormCancelCallback(value);
    }

    export function stringify (value: FormCancelCallback): string {
        return stringifyFormCancelCallback(value);
    }

    export function parse (value: any): FormCancelCallback | undefined {
        return parseFormCancelCallback(value);
    }

}
