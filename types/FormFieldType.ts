// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "./FormItemType";
import {isString} from "../../ts/modules/lodash";

export type FormFieldType = (
    FormItemType.TEXT_FIELD
    | FormItemType.CHECKBOX_FIELD
    | FormItemType.INTEGER_FIELD
    | FormItemType.TEXT_AREA_FIELD
    | FormItemType.PASSWORD_FIELD
    | FormItemType.EMAIL_FIELD
    | FormItemType.SELECT_FIELD
);

export function isFormFieldType (value: any): value is FormFieldType {

    if (!isString(value)) return false;

    switch (value) {

        case FormItemType.TEXT_FIELD:
        case FormItemType.CHECKBOX_FIELD:
        case FormItemType.TEXT_AREA_FIELD:
        case FormItemType.PASSWORD_FIELD:
        case FormItemType.EMAIL_FIELD:
        case FormItemType.INTEGER_FIELD:
        case FormItemType.SELECT_FIELD:
            return true;

        default:
            return false;
    }

}

export function stringifyFormFieldType (value: FormFieldType): string {
    if ( !isFormFieldType(value) ) throw new TypeError(`Not FormFieldType: ${value}`);
    return `FormFieldType(${value})`;
}

export function parseFormFieldType (value: any): FormFieldType | undefined {
    if ( isFormFieldType(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace FormFieldType {

    export function test (value: any): value is FormFieldType {
        return isFormFieldType(value);
    }

    export function stringify (value: FormFieldType): string {
        return stringifyFormFieldType(value);
    }

    export function parse (value: any): FormFieldType | undefined {
        return parseFormFieldType(value);
    }

}

export default FormFieldType;