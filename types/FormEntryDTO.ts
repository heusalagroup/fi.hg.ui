// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormModel, { isFormModel } from "./FormModel";
import { isPipelineModel, PipelineModel } from "../../pipeline/types/PipelineModel";
import FormValue, { isFormValue } from "./FormValue";
import {
    hasNoOtherKeys,
    isNumber,
    isNumberOrUndefined,
    isRegularObject,
    isString,
    isStringOrUndefined,
    isUndefined
} from "../../ts/modules/lodash";

export const FORM_ENTRY_DTO_KEYS = ['id', 'formId', 'formModel', 'formVersion', 'value', 'formPipeline'];

export interface FormEntryDTO {

    readonly id             : string;
    readonly formId         : string;
    readonly formModel      : FormModel;
    readonly formVersion    : number;
    readonly formPipeline  ?: PipelineModel;
    readonly value          : FormValue;

}

export function isFormEntryDTO (value: any) : value is FormEntryDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, FORM_ENTRY_DTO_KEYS)
        && isString(value?.id)
        && isString(value?.formId)
        && isFormModel(value?.formModel)
        && isNumber(value?.formVersion)
        && isFormValue(value?.value)
        && ( isUndefined(value?.formPipeline) || isPipelineModel(value?.formPipeline) )
    );
}

export function isPartialFormEntryDTO (value: any) : value is Partial<FormEntryDTO> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, FORM_ENTRY_DTO_KEYS)
        && isStringOrUndefined(value?.id)
        && isStringOrUndefined(value?.formId)
        && (isUndefined(value?.formModel) || isFormModel(value?.formModel))
        && isNumberOrUndefined(value?.formVersion)
        && (isUndefined(value?.value) || isFormValue(value?.value))
        && (isUndefined(value?.formPipeline) || isPipelineModel(value?.formPipeline))
    );
}

export default FormEntryDTO;
