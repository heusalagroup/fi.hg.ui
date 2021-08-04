// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {isString, trim} from "../../ts/modules/lodash";

export enum HttpMethod {

    OPTIONS  = "OPTIONS",
    GET      = "GET",
    POST     = "POST",
    PUT      = "PUT",
    DELETE   = "DELETE",
    PATCH    = "PATCH"

}

export function stringifyHttpMethod (value : HttpMethod) : string {
    switch (value) {
        case HttpMethod.OPTIONS  : return 'options';
        case HttpMethod.GET      : return 'get';
        case HttpMethod.POST     : return 'post';
        case HttpMethod.PUT      : return 'put';
        case HttpMethod.DELETE   : return 'delete';
        case HttpMethod.PATCH    : return 'patch';
    }
    throw new TypeError(`Unsupported HttpMethod value: ${value}`)
}

export function isHttpMethod (value: any) : value is HttpMethod {
    if (!isString(value)) return false;
    switch (value) {
        case HttpMethod.OPTIONS:
        case HttpMethod.GET:
        case HttpMethod.POST:
        case HttpMethod.PUT:
        case HttpMethod.DELETE:
        case HttpMethod.PATCH:
            return true;

        default:
            return false;

    }
}

export function parseHttpMethod (value: any) : HttpMethod | undefined {

    if (!isString(value)) {
        return undefined;
    }

    value = trim(value).toUpperCase();
    switch(value) {

        case 'OPTIONS' : return HttpMethod.OPTIONS;
        case 'GET'     : return HttpMethod.GET;
        case 'POST'    : return HttpMethod.POST;
        case 'PUT'     : return HttpMethod.PUT;
        case 'DELETE'  : return HttpMethod.DELETE;
        case 'PATCH'   : return HttpMethod.PATCH;
        default        : return undefined;

    }

}

// eslint-disable-next-line
export namespace HttpMethod {

    function test (value : any) : value is HttpMethod {
        return isHttpMethod(value);
    }

    function stringify (value: HttpMethod) : string {
        return stringifyHttpMethod(value);
    }

    function parse (value: any) : HttpMethod | undefined {
        return parseHttpMethod(value);
    }

}

export default HttpMethod;
