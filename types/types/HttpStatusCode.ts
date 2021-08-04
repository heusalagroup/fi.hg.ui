// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

/**
 * HTTP Status number or range of numbers.
 *
 * Can be:
 *
 *  - Single status code, eg, 200 OK as `200`
 *
 *  - Multiple status codes, eg, from 200 to 299 as `[200, 299]`
 */
export type HttpStatusCode = number | [number, number];

export default HttpStatusCode;
