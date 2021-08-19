// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import FormModel, { isFormModel } from "./FormModel";
import { isPipelineModel, PipelineModel } from "../../pipeline/types/PipelineModel";
import FormValue, { isFormValue } from "./FormValue";
import {
    hasNoOtherKeys,
    isRegularObject,
    isStringOrUndefined,
    isUndefined
} from "../../ts/modules/lodash";

export interface FormDTO {

    readonly model     : FormModel;
    readonly id       ?: string;
    readonly value    ?: FormValue;
    readonly pipeline ?: PipelineModel;

}

export function isFormDTO (value: any) : value is FormDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['id', 'model', 'value', 'pipeline'])
        && isFormModel(value?.model)
        && isStringOrUndefined(value?.id)
        && ( isUndefined(value?.value)    || isFormValue(value?.value) )
        && ( isUndefined(value?.pipeline) || isPipelineModel(value?.pipeline) )
    );
}

export function isPartialFormDTO (value: any) : value is Partial<FormDTO> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['id', 'model', 'value', 'pipeline'])
        && isStringOrUndefined(value?.id)
        && (isUndefined(value?.model) || isFormModel(value?.model))
        && (isUndefined(value?.value) || isFormValue(value?.value))
        && (isUndefined(value?.pipeline) || isPipelineModel(value?.pipeline))
    );
}

export default FormDTO;
