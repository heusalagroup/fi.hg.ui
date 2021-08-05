// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import HttpMethod, {isHttpMethod, parseHttpMethod, stringifyHttpMethod} from "./HttpMethod";

describe('stringifyHttpMethod', () => {

    test( 'can stringify values', () => {

        expect(stringifyHttpMethod(HttpMethod.OPTIONS)).toBe('OPTIONS');
        expect(stringifyHttpMethod(HttpMethod.GET)).toBe('GET');
        expect(stringifyHttpMethod(HttpMethod.POST)).toBe('POST');
        expect(stringifyHttpMethod(HttpMethod.PUT)).toBe('PUT');
        expect(stringifyHttpMethod(HttpMethod.DELETE)).toBe('DELETE');
        expect(stringifyHttpMethod(HttpMethod.PATCH)).toBe('PATCH');

    });

    test( 'throws TypeError on incorrect values', () => {

        // @ts-ignore
        expect(() => stringifyHttpMethod( undefined )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( null )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( false )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( true )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( NaN )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( () => {} )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( 0 )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( Symbol() )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( 1628078651664 )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( new Date('2021-08-04T12:04:00.844Z') )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( 1 )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( 12 )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( -12 )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( 123 )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( 123.99999 )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( -123.99999 )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( "123" )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( "hello" )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( "" )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( [] )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( [ 123 ] )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( [ "123" ] )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( [ "Hello world", "foo" ] )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( {} )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( {"foo": "bar"} )).toThrow(TypeError);
        // @ts-ignore
        expect(() => stringifyHttpMethod( {"foo": 1234} )).toThrow(TypeError);

    });

});

describe('isHttpMethod', () => {

    test( 'can detect HttpMethods', () => {

        expect(isHttpMethod( HttpMethod.OPTIONS )).toBe(true);
        expect(isHttpMethod( HttpMethod.GET )).toBe(true);
        expect(isHttpMethod( HttpMethod.POST )).toBe(true);
        expect(isHttpMethod( HttpMethod.PUT )).toBe(true);
        expect(isHttpMethod( HttpMethod.DELETE )).toBe(true);
        expect(isHttpMethod( HttpMethod.PATCH )).toBe(true);

    });

    test( 'can detect invalid values', () => {

        expect(isHttpMethod(undefined) ).toBe(false);
        expect(isHttpMethod(null) ).toBe(false);
        expect(isHttpMethod(false) ).toBe(false);
        expect(isHttpMethod(true) ).toBe(false);
        expect(isHttpMethod(NaN) ).toBe(false);
        expect(isHttpMethod(() => {}) ).toBe(false);
        expect(isHttpMethod(0) ).toBe(false);
        expect(isHttpMethod(Symbol()) ).toBe(false);
        expect(isHttpMethod(1628078651664) ).toBe(false);
        expect(isHttpMethod(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
        expect(isHttpMethod(1) ).toBe(false);
        expect(isHttpMethod(12) ).toBe(false);
        expect(isHttpMethod(-12) ).toBe(false);
        expect(isHttpMethod(123) ).toBe(false);
        expect(isHttpMethod(123.99999) ).toBe(false);
        expect(isHttpMethod(-123.99999) ).toBe(false);
        expect(isHttpMethod("123") ).toBe(false);
        expect(isHttpMethod("hello") ).toBe(false);
        expect(isHttpMethod("") ).toBe(false);
        expect(isHttpMethod([]) ).toBe(false);
        expect(isHttpMethod([123]) ).toBe(false);
        expect(isHttpMethod(["123"]) ).toBe(false);
        expect(isHttpMethod(["Hello world", "foo"]) ).toBe(false);
        expect(isHttpMethod({}) ).toBe(false);
        expect(isHttpMethod({"foo":"bar"}) ).toBe(false);
        expect(isHttpMethod({"foo":1234}) ).toBe(false);

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

        expect( parseHttpMethod(undefined) ).toBeUndefined();
        expect( parseHttpMethod(null) ).toBeUndefined();
        expect( parseHttpMethod(false) ).toBeUndefined();
        expect( parseHttpMethod(true) ).toBeUndefined();
        expect( parseHttpMethod(NaN) ).toBeUndefined();
        expect( parseHttpMethod(() => {}) ).toBeUndefined();
        expect( parseHttpMethod(0) ).toBeUndefined();
        expect( parseHttpMethod(Symbol()) ).toBeUndefined();
        expect( parseHttpMethod(1628078651664) ).toBeUndefined();
        expect( parseHttpMethod(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
        expect( parseHttpMethod(1) ).toBeUndefined();
        expect( parseHttpMethod(12) ).toBeUndefined();
        expect( parseHttpMethod(-12) ).toBeUndefined();
        expect( parseHttpMethod(123) ).toBeUndefined();
        expect( parseHttpMethod(123.99999) ).toBeUndefined();
        expect( parseHttpMethod(-123.99999) ).toBeUndefined();
        expect( parseHttpMethod("123") ).toBeUndefined();
        expect( parseHttpMethod("hello") ).toBeUndefined();
        expect( parseHttpMethod("") ).toBeUndefined();
        expect( parseHttpMethod([]) ).toBeUndefined();
        expect( parseHttpMethod([123]) ).toBeUndefined();
        expect( parseHttpMethod(["123"]) ).toBeUndefined();
        expect( parseHttpMethod(["Hello world", "foo"]) ).toBeUndefined();
        expect( parseHttpMethod({}) ).toBeUndefined();
        expect( parseHttpMethod({"foo":"bar"}) ).toBeUndefined();
        expect( parseHttpMethod({"foo":1234}) ).toBeUndefined();

    });

});

describe('HttpMethod', () => {

    describe('.test', () => {

        test( 'can detect HttpMethods', () => {

            expect(isHttpMethod( HttpMethod.OPTIONS )).toBe(true);
            expect(isHttpMethod( HttpMethod.GET )).toBe(true);
            expect(isHttpMethod( HttpMethod.POST )).toBe(true);
            expect(isHttpMethod( HttpMethod.PUT )).toBe(true);
            expect(isHttpMethod( HttpMethod.DELETE )).toBe(true);
            expect(isHttpMethod( HttpMethod.PATCH )).toBe(true);

        });

        test( 'can detect invalid values', () => {

            expect(HttpMethod.test(undefined) ).toBe(false);
            expect(HttpMethod.test(null) ).toBe(false);
            expect(HttpMethod.test(false) ).toBe(false);
            expect(HttpMethod.test(true) ).toBe(false);
            expect(HttpMethod.test(NaN) ).toBe(false);
            expect(HttpMethod.test(() => {}) ).toBe(false);
            expect(HttpMethod.test(0) ).toBe(false);
            expect(HttpMethod.test(Symbol()) ).toBe(false);
            expect(HttpMethod.test(1628078651664) ).toBe(false);
            expect(HttpMethod.test(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
            expect(HttpMethod.test(1) ).toBe(false);
            expect(HttpMethod.test(12) ).toBe(false);
            expect(HttpMethod.test(-12) ).toBe(false);
            expect(HttpMethod.test(123) ).toBe(false);
            expect(HttpMethod.test(123.99999) ).toBe(false);
            expect(HttpMethod.test(-123.99999) ).toBe(false);
            expect(HttpMethod.test("123") ).toBe(false);
            expect(HttpMethod.test("hello") ).toBe(false);
            expect(HttpMethod.test("") ).toBe(false);
            expect(HttpMethod.test([]) ).toBe(false);
            expect(HttpMethod.test([123]) ).toBe(false);
            expect(HttpMethod.test(["123"]) ).toBe(false);
            expect(HttpMethod.test(["Hello world", "foo"]) ).toBe(false);
            expect(HttpMethod.test({}) ).toBe(false);
            expect(HttpMethod.test({"foo":"bar"}) ).toBe(false);
            expect(HttpMethod.test({"foo":1234}) ).toBe(false);

        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect(HttpMethod.stringify(HttpMethod.OPTIONS)).toBe('OPTIONS');
            expect(HttpMethod.stringify(HttpMethod.GET)).toBe('GET');
            expect(HttpMethod.stringify(HttpMethod.POST)).toBe('POST');
            expect(HttpMethod.stringify(HttpMethod.PUT)).toBe('PUT');
            expect(HttpMethod.stringify(HttpMethod.DELETE)).toBe('DELETE');
            expect(HttpMethod.stringify(HttpMethod.PATCH)).toBe('PATCH');

        });

        test( 'throws TypeError on incorrect values', () => {
            // @ts-ignore
            expect(() => HttpMethod.stringify( undefined )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( null )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( false )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( true )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( NaN )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( () => {} )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( 0 )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( Symbol() )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( 1628078651664 )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( new Date('2021-08-04T12:04:00.844Z') )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( 1 )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( 12 )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( -12 )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( 123 )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( 123.99999 )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( -123.99999 )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( "123" )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( "hello" )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( "" )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( [] )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( [ 123 ] )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( [ "123" ] )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( [ "Hello world", "foo" ] )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( {} )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( {"foo": "bar"} )).toThrow(TypeError);
            // @ts-ignore
            expect(() => HttpMethod.stringify( {"foo": 1234} )).toThrow(TypeError);
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

            expect( HttpMethod.parse(undefined) ).toBeUndefined();
            expect( HttpMethod.parse(null) ).toBeUndefined();
            expect( HttpMethod.parse(false) ).toBeUndefined();
            expect( HttpMethod.parse(true) ).toBeUndefined();
            expect( HttpMethod.parse(NaN) ).toBeUndefined();
            expect( HttpMethod.parse(() => {}) ).toBeUndefined();
            expect( HttpMethod.parse(0) ).toBeUndefined();
            expect( HttpMethod.parse(Symbol()) ).toBeUndefined();
            expect( HttpMethod.parse(1628078651664) ).toBeUndefined();
            expect( HttpMethod.parse(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
            expect( HttpMethod.parse(1) ).toBeUndefined();
            expect( HttpMethod.parse(12) ).toBeUndefined();
            expect( HttpMethod.parse(-12) ).toBeUndefined();
            expect( HttpMethod.parse(123) ).toBeUndefined();
            expect( HttpMethod.parse(123.99999) ).toBeUndefined();
            expect( HttpMethod.parse(-123.99999) ).toBeUndefined();
            expect( HttpMethod.parse("123") ).toBeUndefined();
            expect( HttpMethod.parse("hello") ).toBeUndefined();
            expect( HttpMethod.parse("") ).toBeUndefined();
            expect( HttpMethod.parse([]) ).toBeUndefined();
            expect( HttpMethod.parse([123]) ).toBeUndefined();
            expect( HttpMethod.parse(["123"]) ).toBeUndefined();
            expect( HttpMethod.parse(["Hello world", "foo"]) ).toBeUndefined();
            expect( HttpMethod.parse({}) ).toBeUndefined();
            expect( HttpMethod.parse({"foo":"bar"}) ).toBeUndefined();
            expect( HttpMethod.parse({"foo":1234}) ).toBeUndefined();

        });

    });

});
