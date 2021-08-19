// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {
    isBooleanOrUndefined,
    isStringOrUndefined
} from "../../ts/modules/lodash";
import FormItemModel from "./FormItemModel";
import {FormFieldType, isFormFieldType} from "./FormFieldType";

export interface FormFieldModel extends FormItemModel {

    type        : FormFieldType;
    key         ?: string;
    label       ?: string;
    placeholder ?: string;
    required    ?: boolean;

}

export function isFormFieldModel (value: any) : value is FormFieldModel {
    return (
        !!value
        && isFormFieldType(value?.type)
        && isStringOrUndefined(value?.key)
        && isStringOrUndefined(value?.label)
        && isStringOrUndefined(value?.placeholder)
        && isBooleanOrUndefined(value?.required)
    );
}

export function stringifyFormFieldModel (value: FormFieldModel): string {
    if ( !isFormFieldModel(value) ) throw new TypeError(`Not FormFieldModel: ${value}`);
    return `FormFieldModel(${value})`;
}

export function parseFormFieldModel (value: any): FormFieldModel | undefined {
    if ( isFormFieldModel(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace FormFieldModel {

    export function test (value: any): value is FormFieldModel {
        return isFormFieldModel(value);
    }

    export function stringify (value: FormFieldModel): string {
        return stringifyFormFieldModel(value);
    }

    export function parse (value: any): FormFieldModel | undefined {
        return parseFormFieldModel(value);
    }

}

export default FormFieldModel;
