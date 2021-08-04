// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import HttpMethod, {isHttpMethod, parseHttpMethod, stringifyHttpMethod} from "./HttpMethod";
import {TestUtils} from "../test/TestUtils";

const VALID_TEST_VALUES = [
    HttpMethod.OPTIONS,
    HttpMethod.GET,
    HttpMethod.POST,
    HttpMethod.PUT,
    HttpMethod.DELETE,
    HttpMethod.PATCH
];

describe('stringifyHttpMethod', () => {

    test( 'can stringify values', () => {

        expect(stringifyHttpMethod(HttpMethod.OPTIONS)).toBe('options');
        expect(stringifyHttpMethod(HttpMethod.GET)).toBe('get');
        expect(stringifyHttpMethod(HttpMethod.POST)).toBe('post');
        expect(stringifyHttpMethod(HttpMethod.PUT)).toBe('put');
        expect(stringifyHttpMethod(HttpMethod.DELETE)).toBe('delete');
        expect(stringifyHttpMethod(HttpMethod.PATCH)).toBe('patch');

    });

    test( 'throws TypeError on incorrect values', () => {
        TestUtils.createInvalidValues(VALID_TEST_VALUES).forEach((item: any) => {
            // @ts-ignore
            expect(() => stringifyHttpMethod(item) ).toThrow(TypeError);
        });
    });

});

describe('isHttpMethod', () => {

    test( 'can detect HttpMethods', () => {
        VALID_TEST_VALUES.forEach(item => {
            expect(isHttpMethod(item)).toBe(true);
        });
    });

    test( 'can detect invalid values', () => {

        TestUtils.createInvalidValues(VALID_TEST_VALUES).forEach((item: any) => {
            // @ts-ignore
            expect(isHttpMethod(item) ).toBe(false);
        });

    });

});

describe('parseHttpMethod', () => {

    test( 'can parse HttpMethods', () => {

        expect(parseHttpMethod(HttpMethod.OPTIONS)).toBe(HttpMethod.OPTIONS);
        expect(parseHttpMethod(HttpMethod.GET)).toBe(HttpMethod.GET);
        expect(parseHttpMethod(HttpMethod.POST)).toBe(HttpMethod.POST);
        expect(parseHttpMethod(HttpMethod.PUT)).toBe(HttpMethod.PUT);
        expect(parseHttpMethod(HttpMethod.DELETE)).toBe(HttpMethod.DELETE);
        expect(parseHttpMethod(HttpMethod.PATCH)).toBe(HttpMethod.PATCH);

        expect(parseHttpMethod("OPTIONS")).toBe(HttpMethod.OPTIONS);
        expect(parseHttpMethod("GET")).toBe(HttpMethod.GET);
        expect(parseHttpMethod("POST")).toBe(HttpMethod.POST);
        expect(parseHttpMethod("PUT")).toBe(HttpMethod.PUT);
        expect(parseHttpMethod("DELETE")).toBe(HttpMethod.DELETE);
        expect(parseHttpMethod("PATCH")).toBe(HttpMethod.PATCH);

        expect(parseHttpMethod("options")).toBe(HttpMethod.OPTIONS);
        expect(parseHttpMethod("get")).toBe(HttpMethod.GET);
        expect(parseHttpMethod("post")).toBe(HttpMethod.POST);
        expect(parseHttpMethod("put")).toBe(HttpMethod.PUT);
        expect(parseHttpMethod("delete")).toBe(HttpMethod.DELETE);
        expect(parseHttpMethod("patch")).toBe(HttpMethod.PATCH);

    });

    test( 'returns undefined for invalid values', () => {

        TestUtils.createInvalidValues(VALID_TEST_VALUES).forEach((item: any) => {
            expect( parseHttpMethod(item) ).toBeUndefined();
        });

    });


});

describe('HttpMethod', () => {

    describe('.test', () => {

        test( 'can detect HttpMethods', () => {
            VALID_TEST_VALUES.forEach(item => {
                expect(isHttpMethod(item)).toBe(true);
            });
        });

        test( 'can detect invalid values', () => {
            TestUtils.createInvalidValues(VALID_TEST_VALUES).forEach((item: any) => {
                // @ts-ignore
                expect(HttpMethod.test(item) ).toBe(false);
            });
        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect(HttpMethod.stringify(HttpMethod.OPTIONS)).toBe('options');
            expect(HttpMethod.stringify(HttpMethod.GET)).toBe('get');
            expect(HttpMethod.stringify(HttpMethod.POST)).toBe('post');
            expect(HttpMethod.stringify(HttpMethod.PUT)).toBe('put');
            expect(HttpMethod.stringify(HttpMethod.DELETE)).toBe('delete');
            expect(HttpMethod.stringify(HttpMethod.PATCH)).toBe('patch');

        });

        test( 'throws TypeError on incorrect values', () => {
            TestUtils.createInvalidValues(VALID_TEST_VALUES).forEach((item: any) => {
                // @ts-ignore
                expect(() => HttpMethod.stringify(item) ).toThrow(TypeError);
            });
        });

    });

    describe('.parse', () => {

        test( 'can parse HttpMethods', () => {

            expect(HttpMethod.parse(HttpMethod.OPTIONS)).toBe(HttpMethod.OPTIONS);
            expect(HttpMethod.parse(HttpMethod.GET)).toBe(HttpMethod.GET);
            expect(HttpMethod.parse(HttpMethod.POST)).toBe(HttpMethod.POST);
            expect(HttpMethod.parse(HttpMethod.PUT)).toBe(HttpMethod.PUT);
            expect(HttpMethod.parse(HttpMethod.DELETE)).toBe(HttpMethod.DELETE);
            expect(HttpMethod.parse(HttpMethod.PATCH)).toBe(HttpMethod.PATCH);

            expect(HttpMethod.parse("OPTIONS")).toBe(HttpMethod.OPTIONS);
            expect(HttpMethod.parse("GET")).toBe(HttpMethod.GET);
            expect(HttpMethod.parse("POST")).toBe(HttpMethod.POST);
            expect(HttpMethod.parse("PUT")).toBe(HttpMethod.PUT);
            expect(HttpMethod.parse("DELETE")).toBe(HttpMethod.DELETE);
            expect(HttpMethod.parse("PATCH")).toBe(HttpMethod.PATCH);

            expect(HttpMethod.parse("options")).toBe(HttpMethod.OPTIONS);
            expect(HttpMethod.parse("get")).toBe(HttpMethod.GET);
            expect(HttpMethod.parse("post")).toBe(HttpMethod.POST);
            expect(HttpMethod.parse("put")).toBe(HttpMethod.PUT);
            expect(HttpMethod.parse("delete")).toBe(HttpMethod.DELETE);
            expect(HttpMethod.parse("patch")).toBe(HttpMethod.PATCH);

        });

        test( 'returns undefined for invalid values', () => {

            TestUtils.createInvalidValues(VALID_TEST_VALUES).forEach((item: any) => {
                expect( HttpMethod.parse(item) ).toBeUndefined();
            });

        });

    });

});
