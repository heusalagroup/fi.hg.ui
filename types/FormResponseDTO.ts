// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormDTO, { isFormDTO } from "./FormDTO";
import { hasNoOtherKeys, isRegularObject, isSafeInteger, isString } from "../../ts/modules/lodash";

export interface FormResponseDTO {
    readonly id       : string;
    readonly version  : number;
    readonly payload  : FormDTO;
}

export function isFormResponseDTO (
    value: any
): value is FormResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['id', 'version', 'payload'])
        && isString(value?.id)
        && isSafeInteger(value?.version)
        && isFormDTO(value?.payload)
    );
}

export function stringifyFormResponseDTO (value: FormResponseDTO): string {
    if ( !isFormResponseDTO(value) ) throw new TypeError(`Not FormResponseDTO: ${value}`);
    return `FormResponseDTO(${value})`;
}

export function parseFormResponseDTO (value: any): FormResponseDTO | undefined {
    if ( isFormResponseDTO(value) ) return value;
    return undefined;
}

export default FormResponseDTO;
