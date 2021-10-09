// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isNumber,
    isRegularObject,
    isString,
    isUndefined
} from "../../../ts/modules/lodash";
import PublicPipelineRunDTO, { isPublicPipelineRunDTO } from "../../../pipeline/dto/PublicPipelineRunDTO";

export interface FormSubmitResponseDTO {
    readonly id           : string;
    readonly formId       : string;
    readonly formVersion  : number;
    readonly run         ?: PublicPipelineRunDTO;
}

export function isFormSubmitResponseDTO (
    value: any
): value is FormSubmitResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'formId',
            'formVersion',
            'run'
        ])
        && isString(value?.id)
        && isString(value?.formId)
        && isNumber(value?.formVersion)
        && ( isUndefined(value?.run) || isPublicPipelineRunDTO(value?.run) )
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
