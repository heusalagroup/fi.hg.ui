// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import RequestMethod from "../../../ts/request/types/RequestMethod";
import {JsonArray, JsonObject} from "../../../ts/Json";
import {HttpResponseAction} from "./HttpResponseAction";

export interface JsonHttpAction {

    /**
     * Defaults to POST method.
     */
    readonly method?: RequestMethod;

    readonly url: string;

    /**
     * The payload which will be used to initialize the request body before form value is merged in.
     *
     * If it is an array, the form payload will be added as the last item.
     *
     * Defaults to an empty object.
     */
    readonly payload: JsonObject | JsonArray;

    /** First matching action will be used. */
    readonly onResponse ?: HttpResponseAction | HttpResponseAction[];

}

export default JsonHttpAction;
