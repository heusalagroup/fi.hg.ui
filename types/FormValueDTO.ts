// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormValue, { isFormValue } from "./FormValue";
import {
    hasNoOtherKeys, isNumber, isNumberOrUndefined,
    isRegularObject, isString,
    isStringOrUndefined,
    isUndefined
} from "../../ts/modules/lodash";

export interface FormValueDTO {

    readonly id          ?: string;
    readonly formId       : string;
    readonly formVersion  : number;
    readonly value        : FormValue;

}

export function isFormValueDTO (value: any) : value is FormValueDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['id', 'formId', 'formVersion', 'value'])
        && isStringOrUndefined(value?.id)
        && isString(value?.formId)
        && isNumber(value?.formVersion)
        && isFormValue(value?.value)
    );
}

export function isPartialFormValueDTO (value: any) : value is Partial<FormValueDTO> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['id', 'formId', 'formVersion', 'value'])
        && isStringOrUndefined(value?.id)
        && isStringOrUndefined(value?.formId)
        && isNumberOrUndefined(value?.formVersion)
        && (isUndefined(value?.value) || isFormValue(value?.value))
    );
}

export default FormValueDTO;
