// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormDTO, { isFormDTO } from "./FormDTO";
import { isRepositoryEntry, RepositoryEntry } from "../../ts/simpleRepository/types/RepositoryEntry";
import { hasNoOtherKeys, isArrayOf, isRegularObject } from "../../ts/modules/lodash";

export interface FormListResponseDTO {
    readonly payload: RepositoryEntry<FormDTO>[];
}

export function isFormListResponseDTO (value: any): value is FormListResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['payload'])
        && isArrayOf<RepositoryEntry<FormDTO>>(value.payload, item => isRepositoryEntry<FormDTO>(item, isFormDTO) )
    );
}

export function stringifyFormListResponseDTO (value: FormListResponseDTO): string {
    if ( !isFormListResponseDTO(value) ) throw new TypeError(`Not FormListResponseDTO: ${value}`);
    return `FormListResponseDTO(${value})`;
}

export function parseFormListResponseDTO (value: any): FormListResponseDTO | undefined {
    if ( isFormListResponseDTO(value) ) return value;
    return undefined;
}

export default FormListResponseDTO;
