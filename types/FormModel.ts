// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItem, {isFormItem} from "./FormItem";
import {every, isArray, isString, isStringOrUndefined} from "../../ts/modules/lodash";

export interface FormModel {

    title        : string;
    cancelLabel ?: string;
    submitLabel ?: string;
    items        : FormItem[];

}

export function isFormModel (value : any) : value is FormModel {

    return (
        !!value
        && isString(value?.title)
        && isStringOrUndefined(value?.cancelLabel)
        && isStringOrUndefined(value?.submitLabel)
        && isArray(value?.items) && every(value.items, isFormItem)
    )

}

export default FormModel;
