// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import JsonHttpAction, { isJsonHttpAction, parseJsonHttpAction, stringifyJsonHttpAction } from "./JsonHttpAction";

describe('isJsonHttpAction', () => {

    test( 'can detect JsonHttpActions', () => {

        expect( isJsonHttpAction({}) ).toBe(true);
        expect( isJsonHttpAction({url:'http://localhost'}) ).toBe(true);
        expect( isJsonHttpAction({url:'http://localhost/path/to'}) ).toBe(true);
        expect( isJsonHttpAction({url:'http://localhost:3000'}) ).toBe(true);
        expect( isJsonHttpAction({url:'http://localhost:3000/path/to'}) ).toBe(true);

    });

    test( 'can detect invalid values', () => {

        expect( isJsonHttpAction(undefined) ).toBe(false);
        expect( isJsonHttpAction(null) ).toBe(false);
        expect( isJsonHttpAction(false) ).toBe(false);
        expect( isJsonHttpAction(true) ).toBe(false);
        expect( isJsonHttpAction(NaN) ).toBe(false);
        expect( isJsonHttpAction(() => {}) ).toBe(false);
        expect( isJsonHttpAction(0) ).toBe(false);
        expect( isJsonHttpAction(Symbol()) ).toBe(false);
        expect( isJsonHttpAction(1628078651664) ).toBe(false);
        expect( isJsonHttpAction(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
        expect( isJsonHttpAction(1) ).toBe(false);
        expect( isJsonHttpAction(12) ).toBe(false);
        expect( isJsonHttpAction(-12) ).toBe(false);
        expect( isJsonHttpAction(123) ).toBe(false);
        expect( isJsonHttpAction(123.99999) ).toBe(false);
        expect( isJsonHttpAction(-123.99999) ).toBe(false);
        expect( isJsonHttpAction("123") ).toBe(false);
        expect( isJsonHttpAction("hello") ).toBe(false);
        expect( isJsonHttpAction("") ).toBe(false);
        expect( isJsonHttpAction([]) ).toBe(false);
        expect( isJsonHttpAction([123]) ).toBe(false);
        expect( isJsonHttpAction(["123"]) ).toBe(false);
        expect( isJsonHttpAction(["Hello world", "foo"]) ).toBe(false);
        expect( isJsonHttpAction({"foo":"bar"}) ).toBe(false);
        expect( isJsonHttpAction({"foo":1234}) ).toBe(false);

    });

});

describe('stringifyJsonHttpAction', () => {

    test( 'can stringify values', () => {

        expect( stringifyJsonHttpAction({}) ).toBe('JsonHttpAction(POST)');
        expect( stringifyJsonHttpAction({url:'http://localhost'}) ).toBe('JsonHttpAction(POST http://localhost)');
        expect( stringifyJsonHttpAction({url:'http://localhost/path/to'}) ).toBe('JsonHttpAction(POST http://localhost/path/to)');
        expect( stringifyJsonHttpAction({url:'http://localhost:3000'}) ).toBe('JsonHttpAction(POST http://localhost:3000)');
        expect( stringifyJsonHttpAction({url:'http://localhost:3000/path/to'}) ).toBe('JsonHttpAction(POST http://localhost:3000/path/to)');

    });

    test( 'throws TypeError on incorrect values', () => {

        // @ts-ignore
        expect( () => stringifyJsonHttpAction(undefined) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(null) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(false) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(true) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(NaN) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(() => {}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(0) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(Symbol()) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(1628078651664) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(1) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(-12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(123) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(-123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction("123") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction("hello") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction("") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction([]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction([123]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(["123"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction(["Hello world", "foo"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction({"foo":"bar"}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyJsonHttpAction({"foo":1234}) ).toThrow(TypeError);

    });

});

describe('parseJsonHttpAction', () => {

    test( 'can parse JsonHttpActions', () => {

        expect( parseJsonHttpAction({}) ).toStrictEqual({});
        expect( parseJsonHttpAction({"method": "post", "url":"http://localhost"}) ).toStrictEqual({"method": "post", "url":"http://localhost"});
        expect( parseJsonHttpAction("123" ) ).toStrictEqual({url: "123"});
        expect( parseJsonHttpAction("hello" ) ).toStrictEqual({url: "hello"});
        expect( parseJsonHttpAction("" ) ).toStrictEqual({});

    });

    test( 'returns undefined for invalid values', () => {

        expect( parseJsonHttpAction(undefined) ).toBeUndefined();
        expect( parseJsonHttpAction(null) ).toBeUndefined();
        expect( parseJsonHttpAction(false) ).toBeUndefined();
        expect( parseJsonHttpAction(true) ).toBeUndefined();
        expect( parseJsonHttpAction(NaN) ).toBeUndefined();
        expect( parseJsonHttpAction(() => {}) ).toBeUndefined();
        expect( parseJsonHttpAction(0) ).toBeUndefined();
        expect( parseJsonHttpAction(Symbol()) ).toBeUndefined();
        expect( parseJsonHttpAction(1628078651664) ).toBeUndefined();
        expect( parseJsonHttpAction(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
        expect( parseJsonHttpAction(1) ).toBeUndefined();
        expect( parseJsonHttpAction(12) ).toBeUndefined();
        expect( parseJsonHttpAction(-12) ).toBeUndefined();
        expect( parseJsonHttpAction(123) ).toBeUndefined();
        expect( parseJsonHttpAction(123.99999) ).toBeUndefined();
        expect( parseJsonHttpAction(-123.99999) ).toBeUndefined();
        expect( parseJsonHttpAction([]) ).toBeUndefined();
        expect( parseJsonHttpAction([123]) ).toBeUndefined();
        expect( parseJsonHttpAction(["123"]) ).toBeUndefined();
        expect( parseJsonHttpAction(["Hello world", "foo"]) ).toBeUndefined();
        expect( parseJsonHttpAction({"foo":"bar"}) ).toBeUndefined();
        expect( parseJsonHttpAction({"foo":1234}) ).toBeUndefined();
        expect( parseJsonHttpAction({"method": "post", "url":"http://localhost", "foo": "bar"}) ).toBeUndefined();

    });


});

describe('JsonHttpAction', () => {

    describe('.test', () => {

        test( 'can detect JsonHttpActions', () => {

            expect( JsonHttpAction.test({}) ).toBe(true);
            expect( JsonHttpAction.test({url:'http://localhost'}) ).toBe(true);
            expect( JsonHttpAction.test({url:'http://localhost/path/to'}) ).toBe(true);
            expect( JsonHttpAction.test({url:'http://localhost:3000'}) ).toBe(true);
            expect( JsonHttpAction.test({url:'http://localhost:3000/path/to'}) ).toBe(true);

        });

        test( 'can detect invalid values', () => {

            expect( JsonHttpAction.test(undefined) ).toBe(false);
            expect( JsonHttpAction.test(null) ).toBe(false);
            expect( JsonHttpAction.test(false) ).toBe(false);
            expect( JsonHttpAction.test(true) ).toBe(false);
            expect( JsonHttpAction.test(NaN) ).toBe(false);
            expect( JsonHttpAction.test(() => {}) ).toBe(false);
            expect( JsonHttpAction.test(0) ).toBe(false);
            expect( JsonHttpAction.test(Symbol()) ).toBe(false);
            expect( JsonHttpAction.test(1628078651664) ).toBe(false);
            expect( JsonHttpAction.test(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
            expect( JsonHttpAction.test(1) ).toBe(false);
            expect( JsonHttpAction.test(12) ).toBe(false);
            expect( JsonHttpAction.test(-12) ).toBe(false);
            expect( JsonHttpAction.test(123) ).toBe(false);
            expect( JsonHttpAction.test(123.99999) ).toBe(false);
            expect( JsonHttpAction.test(-123.99999) ).toBe(false);
            expect( JsonHttpAction.test("123") ).toBe(false);
            expect( JsonHttpAction.test("hello") ).toBe(false);
            expect( JsonHttpAction.test("") ).toBe(false);
            expect( JsonHttpAction.test([]) ).toBe(false);
            expect( JsonHttpAction.test([123]) ).toBe(false);
            expect( JsonHttpAction.test(["123"]) ).toBe(false);
            expect( JsonHttpAction.test(["Hello world", "foo"]) ).toBe(false);
            expect( JsonHttpAction.test({"foo":"bar"}) ).toBe(false);
            expect( JsonHttpAction.test({"foo":1234}) ).toBe(false);

        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect( JsonHttpAction.stringify({}) ).toBe('JsonHttpAction(POST)');
            expect( JsonHttpAction.stringify({url:'http://localhost'}) ).toBe('JsonHttpAction(POST http://localhost)');
            expect( JsonHttpAction.stringify({url:'http://localhost/path/to'}) ).toBe('JsonHttpAction(POST http://localhost/path/to)');
            expect( JsonHttpAction.stringify({url:'http://localhost:3000'}) ).toBe('JsonHttpAction(POST http://localhost:3000)');
            expect( JsonHttpAction.stringify({url:'http://localhost:3000/path/to'}) ).toBe('JsonHttpAction(POST http://localhost:3000/path/to)');

        });

        test( 'throws TypeError on incorrect values', () => {

            // @ts-ignore
            expect( () => JsonHttpAction.stringify(undefined) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(null) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(false) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(true) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(NaN) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(() => {}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(0) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(Symbol()) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(1628078651664) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(1) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(-12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(123) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(-123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify("123") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify("hello") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify("") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify([]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify([123]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(["123"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify(["Hello world", "foo"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify({"foo":"bar"}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => JsonHttpAction.stringify({"foo":1234}) ).toThrow(TypeError);

        });

    });

    describe('.parse', () => {

        test( 'can parse JsonHttpActions', () => {

            expect( JsonHttpAction.parse({}) ).toStrictEqual({});
            expect( JsonHttpAction.parse({"method": "post", "url":"http://localhost"}) ).toStrictEqual({"method": "post", "url":"http://localhost"});
            expect( JsonHttpAction.parse("123") ).toStrictEqual({url: "123"});
            expect( JsonHttpAction.parse("hello") ).toStrictEqual({url: "hello"});
            expect( JsonHttpAction.parse("") ).toStrictEqual({});

        });

        test( 'returns undefined for invalid values', () => {

            expect( JsonHttpAction.parse(undefined) ).toBeUndefined();
            expect( JsonHttpAction.parse(null) ).toBeUndefined();
            expect( JsonHttpAction.parse(false) ).toBeUndefined();
            expect( JsonHttpAction.parse(true) ).toBeUndefined();
            expect( JsonHttpAction.parse(NaN) ).toBeUndefined();
            expect( JsonHttpAction.parse(() => {}) ).toBeUndefined();
            expect( JsonHttpAction.parse(0) ).toBeUndefined();
            expect( JsonHttpAction.parse(Symbol()) ).toBeUndefined();
            expect( JsonHttpAction.parse(1628078651664) ).toBeUndefined();
            expect( JsonHttpAction.parse(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
            expect( JsonHttpAction.parse(1) ).toBeUndefined();
            expect( JsonHttpAction.parse(12) ).toBeUndefined();
            expect( JsonHttpAction.parse(-12) ).toBeUndefined();
            expect( JsonHttpAction.parse(123) ).toBeUndefined();
            expect( JsonHttpAction.parse(123.99999) ).toBeUndefined();
            expect( JsonHttpAction.parse(-123.99999) ).toBeUndefined();
            expect( JsonHttpAction.parse([]) ).toBeUndefined();
            expect( JsonHttpAction.parse([123]) ).toBeUndefined();
            expect( JsonHttpAction.parse(["123"]) ).toBeUndefined();
            expect( JsonHttpAction.parse(["Hello world", "foo"]) ).toBeUndefined();
            expect( JsonHttpAction.parse({"foo": "bar"}) ).toBeUndefined();
            expect( JsonHttpAction.parse({"foo":1234}) ).toBeUndefined();
            expect( JsonHttpAction.parse({"method": "post", "url":"http://localhost", "foo": "bar"}) ).toBeUndefined();

        });

    });

});
