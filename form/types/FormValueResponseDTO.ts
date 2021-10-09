// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormValueDTO, { isFormValueDTO } from "./FormValueDTO";
import ResponseDTO, { isResponseDTO } from "./ResponseDTO";

export interface FormValueResponseDTO extends ResponseDTO<FormValueDTO> {
    readonly id       : string;
    readonly version  : number;
    readonly payload  : FormValueDTO;
}

export function isFormEntryResponseDTO (
    value: any
): value is FormValueResponseDTO {
    return isResponseDTO<FormValueDTO>(value, isFormValueDTO);
}

export function stringifyFormEntryResponseDTO (value: FormValueResponseDTO): string {
    if ( !isFormEntryResponseDTO(value) ) throw new TypeError(`Not FormEntryResponseDTO: ${value}`);
    return `FormEntryResponseDTO(${value})`;
}

export function parseFormEntryResponseDTO (value: any): FormValueResponseDTO | undefined {
    if ( isFormEntryResponseDTO(value) ) return value;
    return undefined;
}

export default FormValueResponseDTO;
