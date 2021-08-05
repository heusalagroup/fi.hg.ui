// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { isJsonArray, isJsonObject, JsonArray, JsonObject } from "../../ts/Json";
import { HttpResponseAction, isHttpResponseAction } from "./HttpResponseAction";
import { isString, isStringOrUndefined, isUndefined } from "../../ts/modules/lodash";
import HttpMethod, { isHttpMethod } from "./HttpMethod";

export interface JsonHttpAction {

    /**
     * Defaults to POST method.
     */
    readonly method?: HttpMethod;

    readonly url ?: string;

    /**
     * The payload which will be used to initialize the request body before form value is merged
     * in.
     *
     * If it is an array, the form payload will be added as the last item.
     *
     * Defaults to an empty object.
     */
    readonly payload ?: JsonObject | JsonArray;

    /** First matching action will be used. */
    readonly onResponse ?: HttpResponseAction | HttpResponseAction[];

}

export function isJsonHttpAction (value: any): value is JsonHttpAction {
    return (
        !!value
        && ( isHttpMethod(value?.method) || isUndefined(value?.method) )
        && isStringOrUndefined(value?.url, 1)
        && ( isJsonObject(value?.payload) || isJsonArray(value?.payload) )
        && ( isHttpResponseAction(value?.onResponse) )
    );
}

export function stringifyJsonHttpAction (value: JsonHttpAction): string {
    if ( !isJsonHttpAction(value) ) throw new TypeError(`Not JsonHttpAction: ${value}`);
    return `JsonHttpAction(${value})`;
}

export function parseJsonHttpAction (value: any): JsonHttpAction | undefined {

    if (isString(value)) {
        return {url: value};
    }

    if (isJsonHttpAction(value)) {
        return value;
    }

    return undefined;

}

// eslint-disable-next-line
export namespace JsonHttpAction {

    export function test (value: any): value is JsonHttpAction {
        return isJsonHttpAction(value);
    }

    export function stringify (value: JsonHttpAction): string {
        return stringifyJsonHttpAction(value);
    }

    export function parse (value: any): JsonHttpAction | undefined {
        return parseJsonHttpAction(value);
    }

}

export default JsonHttpAction;
