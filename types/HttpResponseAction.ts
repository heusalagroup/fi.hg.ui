// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import HttpStatusCodeMatcher, {
    isHttpStatusCodeMatcher,
    parseHttpStatusCodeMatcher, stringifyHttpStatusCodeMatcher
} from "./HttpStatusCodeMatcher";
import FormControllerAction, {
    isFormControllerAction,
    parseFormControllerAction, stringifyFormControllerAction
} from "./FormControllerAction";
import { isRegularObject } from "../../ts/modules/lodash";


export type HttpResponseAction = HttpStatusCodeMatcher<FormControllerAction> | FormControllerAction;


export function isHttpResponseAction (value: any): value is HttpResponseAction {
    return (
        isFormControllerAction(value) || isHttpStatusCodeMatcher(value, isFormControllerAction)
    );
}

export function stringifyHttpResponseAction (value: HttpResponseAction): string {

    if ( isHttpStatusCodeMatcher(value) ) {
        return stringifyHttpStatusCodeMatcher(value);
    }

    return stringifyFormControllerAction(value);

}

export function parseHttpResponseAction (value: any): HttpResponseAction | undefined {

    if ( isRegularObject(value) && value?.action && value?.statusCode ) {
        return parseHttpStatusCodeMatcher<FormControllerAction>(value, isFormControllerAction, parseFormControllerAction);
    }

    return parseFormControllerAction(value);

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
