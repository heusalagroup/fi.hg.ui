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
    if ( !isFormModel(value) ) throw new TypeError(`Not FormModel: ${value}`);
    return `FormModel(${value})`;
}

export function parseFormModel (value: any): FormModel | undefined {
    if ( isFormModel(value) ) return value;
    return undefined;
}

export default FormModel;
