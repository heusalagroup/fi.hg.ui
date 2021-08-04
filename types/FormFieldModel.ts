// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {isString} from "../../ts/modules/lodash";
import FormItemModel from "./FormItemModel";
import {FormFieldType, isFormFieldType} from "./FormFieldType";

export interface FormFieldModel
    extends FormItemModel {

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
        && (value?.key === undefined         || isString(value?.key))
        && (value?.label === undefined       || isString(value?.label))
        && (value?.placeholder === undefined || isString(value?.placeholder))
        && (value?.required === undefined    || isString(value?.required))
    );
}

export default FormFieldModel;
