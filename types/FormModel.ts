// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItem, {isFormItem} from "./FormItem";
import {every, isArray, isString, isStringOrUndefined} from "../../ts/modules/lodash";

export interface FormModel {

    title        : string;
    cancelLabel ?: string;
    submitLabel ?: string;
    items        : FormItem[];

}

export function isFormModel (value : any) : value is FormModel {

    return (
        !!value
        && isString(value?.title)
        && isStringOrUndefined(value?.cancelLabel)
        && isStringOrUndefined(value?.submitLabel)
        && isArray(value?.items) && every(value.items, isFormItem)
    )

}

export function stringifyFormModel (value: FormModel): string {
    return `FormModel(${value})`;
}

export function parseFormModel (value: any): FormModel | undefined {
    if ( isFormModel(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace FormModel {

    export function test (value: any): value is FormModel {
        return isFormModel(value);
    }

    export function stringify (value: FormModel): string {
        return stringifyFormModel(value);
    }

    export function parse (value: any): FormModel | undefined {
        return parseFormModel(value);
    }

}

export default FormModel;
