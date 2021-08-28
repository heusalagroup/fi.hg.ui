// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormValueDTO, { isFormValueDTO } from "./FormValueDTO";
import { isRepositoryEntry, RepositoryEntry } from "../../ts/simpleRepository/types/RepositoryEntry";
import { hasNoOtherKeys, isArrayOf, isRegularObject } from "../../ts/modules/lodash";

export interface FormValueListResponseDTO {
    readonly payload: RepositoryEntry<FormValueDTO>[];
}

export function isFormValueListResponseDTO (value: any): value is FormValueListResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['payload'])
        && isArrayOf<RepositoryEntry<FormValueDTO>>(value.payload, item => isRepositoryEntry<FormValueDTO>(item, isFormValueDTO) )
    );
}

export function stringifyFormValueListResponseDTO (value: FormValueListResponseDTO): string {
    if ( !isFormValueListResponseDTO(value) ) throw new TypeError(`Not FormEntryListResponseDTO: ${value}`);
    return `FormEntryListResponseDTO(${value})`;
}

export function parseFormValueListResponseDTO (value: any): FormValueListResponseDTO | undefined {
    if ( isFormValueListResponseDTO(value) ) return value;
    return undefined;
}

export default FormValueListResponseDTO;
