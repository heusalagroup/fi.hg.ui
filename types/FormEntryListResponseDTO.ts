// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormValueDTO, { isFormValueDTO } from "./FormValueDTO";
import { isRepositoryEntry, RepositoryEntry } from "./RepositoryEntry";
import { hasNoOtherKeys, isArrayOf, isRegularObject } from "../../ts/modules/lodash";

export interface FormEntryListResponseDTO {
    readonly payload: RepositoryEntry<FormValueDTO>[];
}

export function isFormEntryListResponseDTO (value: any): value is FormEntryListResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['payload'])
        && isArrayOf<RepositoryEntry<FormValueDTO>>(value.payload, item => isRepositoryEntry<FormValueDTO>(item, isFormValueDTO) )
    );
}

export function stringifyFormEntryListResponseDTO (value: FormEntryListResponseDTO): string {
    if ( !isFormEntryListResponseDTO(value) ) throw new TypeError(`Not FormEntryListResponseDTO: ${value}`);
    return `FormEntryListResponseDTO(${value})`;
}

export function parseFormEntryListResponseDTO (value: any): FormEntryListResponseDTO | undefined {
    if ( isFormEntryListResponseDTO(value) ) return value;
    return undefined;
}

export default FormEntryListResponseDTO;
