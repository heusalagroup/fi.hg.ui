// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormModel, { isFormModel } from "./FormModel";
import FormValue, { isFormValue } from "./FormValue";
import {
    hasNoOtherKeys,
    isRegularObject,
    isStringOrUndefined,
    isUndefined
} from "../../ts/modules/lodash";
import PipelineRunModel, { isPipelineRunModel } from "../../pipeline/types/PipelineRunModel";

export interface FormDTO {

    readonly model   : FormModel;
    readonly id     ?: string;
    readonly value  ?: FormValue;
    readonly run    ?: PipelineRunModel;

}

export function isFormDTO (value: any) : value is FormDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'model',
            'value',
            'run'
        ])
        && isFormModel(value?.model)
        && isStringOrUndefined(value?.id)
        && ( isUndefined(value?.value) || isFormValue(value?.value) )
        && ( isUndefined(value?.run)   || isPipelineRunModel(value?.run) )
    );
}

export function isPartialFormDTO (value: any) : value is Partial<FormDTO> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'model',
            'value',
            'run'
        ])
        && isStringOrUndefined(value?.id)
        && (isUndefined(value?.model) || isFormModel(value?.model))
        && (isUndefined(value?.value) || isFormValue(value?.value))
        && (isUndefined(value?.run) || isPipelineRunModel(value?.run))
    );
}

export default FormDTO;
