// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {
    FormControllerAction,
    isFormControllerAction,
    parseFormControllerAction
} from "./FormControllerAction";
import FormValue, { isFormValue, parseFormValue } from "./FormValue";
import FormModel, { isFormModel, parseFormModel } from "./FormModel";
import { isObject, isString, trim } from "../../ts/modules/lodash";

export interface FormController {

    readonly model    : FormModel;
    readonly value    ?: FormValue;
    readonly onSubmit ?: FormControllerAction;
    readonly onCancel ?: FormControllerAction;

}

export function isFormController (value: any): value is FormController {
    return (
        !!value
        && isFormModel(value?.model)
        && isFormValue(value?.value)
        && isFormControllerAction(value?.onSubmit)
        && isFormControllerAction(value?.onCancel)
    );
}

export function stringifyFormController (value: FormController): string {
    return `FormController(${value})`;
}

export function parseFormController (controller: any): FormController | undefined {

    if (isFormController(controller)) return controller;

    let v : any = controller;

    if (isString(v)) {

        v = JSON.parse(trim(v));

        if (isFormController(v)) {
            return v;
        }

    }

    if (!isObject(v)) return undefined;

    const model    = v?.model;
    const value    = v?.value;
    const onSubmit = v?.onSubmit;
    const onCancel = v?.onCancel;

    const c = {
        model    : parseFormModel(model),
        value    : parseFormValue(value),
        onSubmit : parseFormControllerAction(onSubmit),
        onCancel : parseFormControllerAction(onCancel)
    };

    if (isFormController(c)) return c;

    return undefined;

}

// eslint-disable-next-line
export namespace FormController {

    export function test (value: any): value is FormController {
        return isFormController(value);
    }

    export function stringify (value: FormController): string {
        return stringifyFormController(value);
    }

    export function parse (value: any): FormController | undefined {
        return parseFormController(value);
    }

}

export default FormController;
