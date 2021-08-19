// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {isString, trim} from "../../ts/modules/lodash";

export enum HttpMethod {

    OPTIONS  = "options",
    GET      = "get",
    POST     = "post",
    PUT      = "put",
    DELETE   = "delete",
    PATCH    = "patch"

}

export type HttpMethodString = (
    HttpMethod.OPTIONS
    | HttpMethod.GET
    | HttpMethod.POST
    | HttpMethod.PUT
    | HttpMethod.DELETE
    | HttpMethod.PATCH
);

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

export function stringifyHttpMethod (value : HttpMethod) : string {
    switch (value) {
        case HttpMethod.OPTIONS  : return 'OPTIONS';
        case HttpMethod.GET      : return 'GET';
        case HttpMethod.POST     : return 'POST';
        case HttpMethod.PUT      : return 'PUT';
        case HttpMethod.DELETE   : return 'DELETE';
        case HttpMethod.PATCH    : return 'PATCH';
    }
    throw new TypeError(`Unsupported HttpMethod value: ${value}`)
}

export function parseHttpMethod (value: any) : HttpMethod | undefined {

    if (!isString(value)) {
        return undefined;
    }

    value = trim(value).toLowerCase();
    switch(value) {

        case 'options' : return HttpMethod.OPTIONS;
        case 'get'     : return HttpMethod.GET;
        case 'post'    : return HttpMethod.POST;
        case 'put'     : return HttpMethod.PUT;
        case 'delete'  : return HttpMethod.DELETE;
        case 'patch'   : return HttpMethod.PATCH;
        default        : return undefined;

    }

}

// eslint-disable-next-line
export namespace HttpMethod {

    export function test (value : any) : value is HttpMethod {
        return isHttpMethod(value);
    }

    export function stringify (value: HttpMethod) : string {
        return stringifyHttpMethod(value);
    }

    export function parse (value: any) : HttpMethod | undefined {
        return parseHttpMethod(value);
    }

}

export default HttpMethod;
