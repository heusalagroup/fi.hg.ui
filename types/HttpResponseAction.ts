// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import HttpStatusCodeMatcher, { isHttpStatusCodeMatcher } from "./HttpStatusCodeMatcher";
import FormControllerAction, { isFormControllerAction } from "./FormControllerAction";

export type HttpResponseAction = HttpStatusCodeMatcher<FormControllerAction> | FormControllerAction;

export function isHttpResponseAction (value: any): value is HttpResponseAction {
    return (
        isFormControllerAction(value)
        || isHttpStatusCodeMatcher(value, isFormControllerAction)
    );
}

export function stringifyHttpResponseAction (value: HttpResponseAction): string {
    if ( !isHttpResponseAction(value) ) throw new TypeError(`Not HttpResponseAction: ${value}`);
    return `HttpResponseAction(${value})`;
}

export function parseHttpResponseAction (value: any): HttpResponseAction | undefined {
    if ( isHttpResponseAction(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace HttpResponseAction {

    export function test (value: any): value is HttpResponseAction {
        return isHttpResponseAction(value);
    }

    export function stringify (value: HttpResponseAction): string {
        return stringifyHttpResponseAction(value);
    }

    export function parse (value: any): HttpResponseAction | undefined {
        return parseHttpResponseAction(value);
    }

}

export default HttpResponseAction;
