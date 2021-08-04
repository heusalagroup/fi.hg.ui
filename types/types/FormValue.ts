// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {every, isString, keys} from "../../../ts/modules/lodash";

export interface FormValue {
    [key: string]: any
}

export function isFormValue (value : any) : value is FormValue {

    return (
        !!value
        && every(keys(value), isString)
    );

}

// eslint-disable-next-line
export namespace FormValue {

    export function test (value : any) : value is FormValue {
        return isFormValue(value);
    }

}

export default FormValue;
