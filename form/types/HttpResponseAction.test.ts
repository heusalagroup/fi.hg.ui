// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import HttpResponseAction, { isHttpResponseAction, parseHttpResponseAction, stringifyHttpResponseAction } from "./HttpResponseAction";

describe('isHttpResponseAction', () => {

    test( 'can detect HttpResponseActions', () => {

        expect( isHttpResponseAction(() => {}) ).toBe(true);
        expect( isHttpResponseAction({statusCode: 200, action: () => {}}) ).toBe(true);
        expect( isHttpResponseAction({statusCode: [200, 299], action: () => {}}) ).toBe(true);
        expect( isHttpResponseAction({}) ).toBe(true);
        expect( isHttpResponseAction("123") ).toBe(true);
        expect( isHttpResponseAction("hello") ).toBe(true);
        expect( isHttpResponseAction("") ).toBe(true);

    });

    test( 'can detect invalid values', () => {

        expect( isHttpResponseAction(undefined) ).toBe(false);
        expect( isHttpResponseAction(null) ).toBe(false);
        expect( isHttpResponseAction(false) ).toBe(false);
        expect( isHttpResponseAction(true) ).toBe(false);
        expect( isHttpResponseAction(NaN) ).toBe(false);
        expect( isHttpResponseAction(0) ).toBe(false);
        expect( isHttpResponseAction(Symbol()) ).toBe(false);
        expect( isHttpResponseAction(1628078651664) ).toBe(false);
        expect( isHttpResponseAction(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
        expect( isHttpResponseAction(1) ).toBe(false);
        expect( isHttpResponseAction(12) ).toBe(false);
        expect( isHttpResponseAction(-12) ).toBe(false);
        expect( isHttpResponseAction(123.99999) ).toBe(false);
        expect( isHttpResponseAction(-123.99999) ).toBe(false);
        expect( isHttpResponseAction([]) ).toBe(false);
        expect( isHttpResponseAction([123]) ).toBe(false);
        expect( isHttpResponseAction(["123"]) ).toBe(false);
        expect( isHttpResponseAction(["Hello world", "foo"]) ).toBe(false);
        expect( isHttpResponseAction({"foo":"bar"}) ).toBe(false);
        expect( isHttpResponseAction({"foo":1234}) ).toBe(false);
        expect( isHttpResponseAction(123) ).toBe(false);

    });

});

describe('stringifyHttpResponseAction', () => {

    test( 'can stringify values', () => {

        expect( stringifyHttpResponseAction(() => {}) ).toBe('FormControllerAction(FormSubmitCallback#())');
        expect( stringifyHttpResponseAction({statusCode: 200, action: () => {}}) ).toBe('HttpStatusCodeMatcher(HttpStatusCode#200)');
        expect( stringifyHttpResponseAction({statusCode: [200, 299], action: () => {}}) ).toBe('HttpStatusCodeMatcher(HttpStatusCode#200, HttpStatusCode#299)');
        expect( stringifyHttpResponseAction({statusCode: [[200, 299]], action: () => {}}) ).toBe('HttpStatusCodeMatcher(HttpStatusCode#200-299)');
        expect( stringifyHttpResponseAction("123") ).toBe("FormControllerAction(JsonHttpAction(POST 123))");
        expect( stringifyHttpResponseAction("hello") ).toBe("FormControllerAction(JsonHttpAction(POST hello))");
        expect( stringifyHttpResponseAction("") ).toBe("FormControllerAction(JsonHttpAction(POST))");
        expect( stringifyHttpResponseAction({}) ).toBe("FormControllerAction(JsonHttpAction(POST))");
        // @ts-ignore
        expect( stringifyHttpResponseAction({method: "put"}) ).toBe("FormControllerAction(JsonHttpAction(PUT))");

    });

    test( 'throws TypeError on incorrect values', () => {


        // @ts-ignore
        expect( () => stringifyHttpResponseAction(undefined) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(null) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(false) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(true) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(NaN) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(0) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(Symbol()) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(1628078651664) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(1) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(-12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(123) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(-123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction([]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction([123]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(["123"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction(["Hello world", "foo"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction({"foo":"bar"}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpResponseAction({"foo":1234}) ).toThrow(TypeError);


    });

});

describe('parseHttpResponseAction', () => {

    test( 'can parse HttpResponseActions', () => {

        const callback = () => {};

        expect( parseHttpResponseAction(callback) ).toStrictEqual(callback);
        expect( parseHttpResponseAction({statusCode: 200, action: callback}) ).toStrictEqual({statusCode: 200, action: callback});
        expect( parseHttpResponseAction({statusCode: [200, 299], action: callback}) ).toStrictEqual({statusCode: [200, 299], action: callback});
        expect( parseHttpResponseAction("123") ).toStrictEqual({url:"123"});
        expect( parseHttpResponseAction("hello") ).toStrictEqual({url:"hello"});
        expect( parseHttpResponseAction("") ).toStrictEqual({});
        expect( parseHttpResponseAction({}) ).toStrictEqual({});

    });

    test( 'returns undefined for invalid values', () => {

        expect( parseHttpResponseAction(undefined) ).toBeUndefined();
        expect( parseHttpResponseAction(null) ).toBeUndefined();
        expect( parseHttpResponseAction(false) ).toBeUndefined();
        expect( parseHttpResponseAction(true) ).toBeUndefined();
        expect( parseHttpResponseAction(NaN) ).toBeUndefined();
        expect( parseHttpResponseAction(0) ).toBeUndefined();
        expect( parseHttpResponseAction(Symbol()) ).toBeUndefined();
        expect( parseHttpResponseAction(1628078651664) ).toBeUndefined();
        expect( parseHttpResponseAction(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
        expect( parseHttpResponseAction(1) ).toBeUndefined();
        expect( parseHttpResponseAction(12) ).toBeUndefined();
        expect( parseHttpResponseAction(-12) ).toBeUndefined();
        expect( parseHttpResponseAction(123) ).toBeUndefined();
        expect( parseHttpResponseAction(123.99999) ).toBeUndefined();
        expect( parseHttpResponseAction(-123.99999) ).toBeUndefined();
        expect( parseHttpResponseAction([]) ).toBeUndefined();
        expect( parseHttpResponseAction([123]) ).toBeUndefined();
        expect( parseHttpResponseAction(["123"]) ).toBeUndefined();
        expect( parseHttpResponseAction(["Hello world", "foo"]) ).toBeUndefined();
        expect( parseHttpResponseAction({"foo":"bar"}) ).toBeUndefined();
        expect( parseHttpResponseAction({"foo":1234}) ).toBeUndefined();

    });

});

describe('HttpResponseAction', () => {

    describe('.test', () => {

        test( 'can detect HttpResponseActions', () => {

            expect( HttpResponseAction.test(() => {}) ).toBe(true);
            expect( HttpResponseAction.test({statusCode: 200, action: () => {}}) ).toBe(true);
            expect( HttpResponseAction.test({statusCode: [200, 299], action: () => {}}) ).toBe(true);
            expect( HttpResponseAction.test({}) ).toBe(true);
            expect( HttpResponseAction.test("123") ).toBe(true);
            expect( HttpResponseAction.test("hello") ).toBe(true);
            expect( HttpResponseAction.test("") ).toBe(true);

        });

        test( 'can detect invalid values', () => {

            expect( HttpResponseAction.test(undefined) ).toBe(false);
            expect( HttpResponseAction.test(null) ).toBe(false);
            expect( HttpResponseAction.test(false) ).toBe(false);
            expect( HttpResponseAction.test(true) ).toBe(false);
            expect( HttpResponseAction.test(NaN) ).toBe(false);
            expect( HttpResponseAction.test(0) ).toBe(false);
            expect( HttpResponseAction.test(Symbol()) ).toBe(false);
            expect( HttpResponseAction.test(1628078651664) ).toBe(false);
            expect( HttpResponseAction.test(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
            expect( HttpResponseAction.test(1) ).toBe(false);
            expect( HttpResponseAction.test(12) ).toBe(false);
            expect( HttpResponseAction.test(-12) ).toBe(false);
            expect( HttpResponseAction.test(123.99999) ).toBe(false);
            expect( HttpResponseAction.test(-123.99999) ).toBe(false);
            expect( HttpResponseAction.test([]) ).toBe(false);
            expect( HttpResponseAction.test([123]) ).toBe(false);
            expect( HttpResponseAction.test(["123"]) ).toBe(false);
            expect( HttpResponseAction.test(["Hello world", "foo"]) ).toBe(false);
            expect( HttpResponseAction.test({"foo":"bar"}) ).toBe(false);
            expect( HttpResponseAction.test({"foo":1234}) ).toBe(false);
            expect( HttpResponseAction.test(123) ).toBe(false);

        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect( HttpResponseAction.stringify(() => {}) ).toBe('FormControllerAction(FormSubmitCallback#())');
            expect( HttpResponseAction.stringify({statusCode: 200, action: () => {}}) ).toBe('HttpStatusCodeMatcher(HttpStatusCode#200)');
            expect( HttpResponseAction.stringify({statusCode: [200, 299], action: () => {}}) ).toBe('HttpStatusCodeMatcher(HttpStatusCode#200, HttpStatusCode#299)');
            expect( HttpResponseAction.stringify({statusCode: [[200, 299]], action: () => {}}) ).toBe('HttpStatusCodeMatcher(HttpStatusCode#200-299)');
            expect( HttpResponseAction.stringify("123") ).toBe("FormControllerAction(JsonHttpAction(POST 123))");
            expect( HttpResponseAction.stringify("hello") ).toBe("FormControllerAction(JsonHttpAction(POST hello))");
            expect( HttpResponseAction.stringify("") ).toBe("FormControllerAction(JsonHttpAction(POST))");
            expect( HttpResponseAction.stringify({}) ).toBe("FormControllerAction(JsonHttpAction(POST))");
            // @ts-ignore
            expect( HttpResponseAction.stringify({method: "put"}) ).toBe("FormControllerAction(JsonHttpAction(PUT))");

        });

        test( 'throws TypeError on incorrect values', () => {

            // @ts-ignore
            expect( () => stringifyHttpResponseAction(undefined) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(null) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(false) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(true) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(NaN) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(0) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(Symbol()) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(1628078651664) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(1) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(-12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(123) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(-123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction([]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction([123]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(["123"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction(["Hello world", "foo"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction({"foo":"bar"}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => stringifyHttpResponseAction({"foo":1234}) ).toThrow(TypeError);

        });

    });

    describe('.parse', () => {

        test( 'can parse HttpResponseActions', () => {

            const callback = () => {};

            expect( HttpResponseAction.parse(callback) ).toStrictEqual(callback);
            expect( HttpResponseAction.parse({statusCode: 200, action: callback}) ).toStrictEqual({statusCode: 200, action: callback});
            expect( HttpResponseAction.parse({statusCode: [200, 299], action: callback}) ).toStrictEqual({statusCode: [200, 299], action: callback});
            expect( HttpResponseAction.parse("123") ).toStrictEqual({url:"123"});
            expect( HttpResponseAction.parse("hello") ).toStrictEqual({url:"hello"});
            expect( HttpResponseAction.parse("") ).toStrictEqual({});
            expect( HttpResponseAction.parse({}) ).toStrictEqual({});

        });

        test( 'returns undefined for invalid values', () => {

            expect( HttpResponseAction.parse(undefined) ).toBeUndefined();
            expect( HttpResponseAction.parse(null) ).toBeUndefined();
            expect( HttpResponseAction.parse(false) ).toBeUndefined();
            expect( HttpResponseAction.parse(true) ).toBeUndefined();
            expect( HttpResponseAction.parse(NaN) ).toBeUndefined();
            expect( HttpResponseAction.parse(0) ).toBeUndefined();
            expect( HttpResponseAction.parse(Symbol()) ).toBeUndefined();
            expect( HttpResponseAction.parse(1628078651664) ).toBeUndefined();
            expect( HttpResponseAction.parse(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
            expect( HttpResponseAction.parse(1) ).toBeUndefined();
            expect( HttpResponseAction.parse(12) ).toBeUndefined();
            expect( HttpResponseAction.parse(-12) ).toBeUndefined();
            expect( HttpResponseAction.parse(123) ).toBeUndefined();
            expect( HttpResponseAction.parse(123.99999) ).toBeUndefined();
            expect( HttpResponseAction.parse(-123.99999) ).toBeUndefined();
            expect( HttpResponseAction.parse([]) ).toBeUndefined();
            expect( HttpResponseAction.parse([123]) ).toBeUndefined();
            expect( HttpResponseAction.parse(["123"]) ).toBeUndefined();
            expect( HttpResponseAction.parse(["Hello world", "foo"]) ).toBeUndefined();
            expect( HttpResponseAction.parse({"foo":"bar"}) ).toBeUndefined();
            expect( HttpResponseAction.parse({"foo":1234}) ).toBeUndefined();

        });

    });

});
