// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {FormValue} from "./FormValue";
import { isFunction } from "../../ts/modules/lodash";

export interface FormSubmitCallback {
    (value: FormValue): void;
}

export function isFormSubmitCallback (value: any): value is FormSubmitCallback {
    return isFunction(value?.foo);
}

export function stringifyFormSubmitCallback (value: FormSubmitCallback): string {
    if ( !isFormSubmitCallback(value) ) throw new TypeError(`Not FormSubmitCallback: ${value}`);
    return `FormSubmitCallback(${value})`;
}

export function parseFormSubmitCallback (value: any): FormSubmitCallback | undefined {
    if ( isFormSubmitCallback(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace FormSubmitCallback {

    export function test (value: any): value is FormSubmitCallback {
        return isFormSubmitCallback(value);
    }

    export function stringify (value: FormSubmitCallback): string {
        return stringifyFormSubmitCallback(value);
    }

    export function parse (value: any): FormSubmitCallback | undefined {
        return parseFormSubmitCallback(value);
    }

}

export default FormSubmitCallback;
