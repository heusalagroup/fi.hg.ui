// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { hasNoOtherKeys, isNumber, isRegularObject, isString } from "../../ts/modules/lodash";

export interface FormSubmitResponseDTO {
    readonly id          : string;
    readonly formId      : string;
    readonly formVersion : number;
}

export function isFormSubmitResponseDTO (
    value: any
): value is FormSubmitResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['id', 'formId', 'formVersion'])
        && isString(value?.id)
        && isString(value?.formId)
        && isNumber(value?.formVersion)
    );
}

export function stringifyFormSubmitResponseDTO (value: FormSubmitResponseDTO): string {
    if ( !isFormSubmitResponseDTO(value) ) throw new TypeError(`Not FormSubmitResponseDTO: ${value}`);
    return `FormSubmitResponseDTO(${value})`;
}

export function parseFormSubmitResponseDTO (value: any): FormSubmitResponseDTO | undefined {
    if ( isFormSubmitResponseDTO(value) ) return value;
    return undefined;
}

export default FormSubmitResponseDTO;
