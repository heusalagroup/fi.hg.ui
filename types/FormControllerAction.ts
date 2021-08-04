// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormSubmitCallback, { isFormSubmitCallback } from "./FormSubmitCallback";
import JsonHttpAction, { isJsonHttpAction } from "./JsonHttpAction";
import { isString } from "../../ts/modules/lodash";

/**
 * If the value is a string, it will be treated as JsonHttpAction with the string as the URL param.
 */
export type FormControllerAction = FormSubmitCallback | JsonHttpAction | string;

export function isFormControllerAction (value: any): value is FormControllerAction {
    return (
        isString(value)
        || isJsonHttpAction(value)
        || isFormSubmitCallback(value)
    );
}

export function stringifyFormControllerAction (value: FormControllerAction): string {
    return `FormControllerAction(${value})`;
}

/**
 * Note! This method will change strings as FormSubmitCallback.
 *
 * @param value
 */
export function parseFormControllerAction (value: any): FormSubmitCallback | JsonHttpAction | undefined {
    return FormSubmitCallback.parse(value) ?? JsonHttpAction.parse(value);
}

// eslint-disable-next-line
export namespace FormControllerAction {

    export function test (value: any): value is FormControllerAction {
        return isFormControllerAction(value);
    }

    export function stringify (value: FormControllerAction): string {
        return stringifyFormControllerAction(value);
    }

    /**
     * Note! This method will change strings as FormSubmitCallback.
     *
     * @param value
     */
    export function parse (value: any): FormSubmitCallback | JsonHttpAction | undefined {
        return parseFormControllerAction(value);
    }

}


export default FormControllerAction;
