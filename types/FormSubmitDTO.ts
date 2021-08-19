// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isRegularObject,
    isString
} from "../../ts/modules/lodash";
import FormValue, { isFormValue } from "./FormValue";

export interface SubmitDTO {
    readonly id      : string;
    readonly payload : FormValue;
}

export function isSubmitDTO (value: any) : value is SubmitDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['id', 'payload'])
        && isString(value?.id)
        && isFormValue(value?.payload)
    );
}

export default SubmitDTO;
