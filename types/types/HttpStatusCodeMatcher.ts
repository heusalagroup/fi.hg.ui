// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import HttpStatusCode from "./HttpStatusCode";

export interface HttpStatusCodeMatcher<T> {

    /**
     * This action will be processed if the response status code matches any of these status codes.
     */
    readonly statusCode: HttpStatusCode | HttpStatusCode[];

    readonly action: T;

}

export default HttpStatusCodeMatcher;
