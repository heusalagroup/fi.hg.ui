// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { isJsonObject, JsonObject } from "../../ts/Json";

export type FormValue = JsonObject;

export function isFormValue (value : any) : value is FormValue {
    return isJsonObject(value);
}

export function stringifyFormValue (value: FormValue): string {
    return `FormValue(${value})`;
}

export function parseFormValue (value: any): FormValue | undefined {
    if ( isFormValue(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace FormValue {

    export function test (value: any): value is FormValue {
        return isFormValue(value);
    }

    export function stringify (value: FormValue): string {
        return stringifyFormValue(value);
    }

    export function parse (value: any): FormValue | undefined {
        return parseFormValue(value);
    }

}

export default FormValue;
