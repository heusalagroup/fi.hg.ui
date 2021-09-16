// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormDTO, { isFormDTO } from "./FormDTO";
import ResponseDTO, { isResponseDTO } from "./ResponseDTO";
import { RepositoryMember } from "../../ts/simpleRepository/types/RepositoryMember";

export interface FormResponseDTO extends ResponseDTO<FormDTO> {
    readonly id       : string;
    readonly version  : number;
    readonly payload  : FormDTO;
    readonly deleted ?: boolean;
    readonly members ?: RepositoryMember[];
}

export function isFormResponseDTO (
    value: any
): value is FormResponseDTO {
    return isResponseDTO<FormDTO>(value, isFormDTO);
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
