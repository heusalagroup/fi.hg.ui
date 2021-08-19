// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormSubmitCallback, { isFormSubmitCallback, parseFormSubmitCallback, stringifyFormSubmitCallback } from "./FormSubmitCallback";
import FormValue from "./FormValue";

describe('isFormSubmitCallback', () => {

    test( 'can detect FormSubmitCallbacks', () => {

        expect( isFormSubmitCallback(() => {}) ).toBe(true);

    });

    test( 'can detect invalid values', () => {

        expect( isFormSubmitCallback(undefined) ).toBe(false);
        expect( isFormSubmitCallback(null) ).toBe(false);
        expect( isFormSubmitCallback(false) ).toBe(false);
        expect( isFormSubmitCallback(true) ).toBe(false);
        expect( isFormSubmitCallback(NaN) ).toBe(false);
        expect( isFormSubmitCallback(0) ).toBe(false);
        expect( isFormSubmitCallback(Symbol()) ).toBe(false);
        expect( isFormSubmitCallback(1628078651664) ).toBe(false);
        expect( isFormSubmitCallback(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
        expect( isFormSubmitCallback(1) ).toBe(false);
        expect( isFormSubmitCallback(12) ).toBe(false);
        expect( isFormSubmitCallback(-12) ).toBe(false);
        expect( isFormSubmitCallback(123) ).toBe(false);
        expect( isFormSubmitCallback(123.99999) ).toBe(false);
        expect( isFormSubmitCallback(-123.99999) ).toBe(false);
        expect( isFormSubmitCallback("123") ).toBe(false);
        expect( isFormSubmitCallback("hello") ).toBe(false);
        expect( isFormSubmitCallback("") ).toBe(false);
        expect( isFormSubmitCallback([]) ).toBe(false);
        expect( isFormSubmitCallback([123]) ).toBe(false);
        expect( isFormSubmitCallback(["123"]) ).toBe(false);
        expect( isFormSubmitCallback(["Hello world", "foo"]) ).toBe(false);
        expect( isFormSubmitCallback({}) ).toBe(false);
        expect( isFormSubmitCallback({"foo":"bar"}) ).toBe(false);
        expect( isFormSubmitCallback({"foo":1234}) ).toBe(false);

    });

});

describe('stringifyFormSubmitCallback', () => {

    test( 'can stringify values', () => {

        expect( stringifyFormSubmitCallback(() => {}) ).toBe('FormSubmitCallback#()');
        expect( stringifyFormSubmitCallback((value: FormValue) => {}) ).toBe('FormSubmitCallback#(value)');

    });

    test( 'throws TypeError on incorrect values', () => {

        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(undefined) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(null) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(false) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(true) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(NaN) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(0) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(Symbol()) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(1628078651664) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(1) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(-12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(123) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(-123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback("123") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback("hello") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback("") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback([]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback([123]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(["123"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback(["Hello world", "foo"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback({}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback({"foo":"bar"}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormSubmitCallback({"foo":1234}) ).toThrow(TypeError);

    });

});

describe('parseFormSubmitCallback', () => {

    test( 'can parse FormSubmitCallbacks', () => {

        const callback = () => {};
        expect( parseFormSubmitCallback(callback) ).toBe(callback);

    });

    test( 'returns undefined for invalid values', () => {

        expect( parseFormSubmitCallback(undefined) ).toBeUndefined();
        expect( parseFormSubmitCallback(null) ).toBeUndefined();
        expect( parseFormSubmitCallback(false) ).toBeUndefined();
        expect( parseFormSubmitCallback(true) ).toBeUndefined();
        expect( parseFormSubmitCallback(NaN) ).toBeUndefined();
        expect( parseFormSubmitCallback(0) ).toBeUndefined();
        expect( parseFormSubmitCallback(Symbol()) ).toBeUndefined();
        expect( parseFormSubmitCallback(1628078651664) ).toBeUndefined();
        expect( parseFormSubmitCallback(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
        expect( parseFormSubmitCallback(1) ).toBeUndefined();
        expect( parseFormSubmitCallback(12) ).toBeUndefined();
        expect( parseFormSubmitCallback(-12) ).toBeUndefined();
        expect( parseFormSubmitCallback(123) ).toBeUndefined();
        expect( parseFormSubmitCallback(123.99999) ).toBeUndefined();
        expect( parseFormSubmitCallback(-123.99999) ).toBeUndefined();
        expect( parseFormSubmitCallback("123") ).toBeUndefined();
        expect( parseFormSubmitCallback("hello") ).toBeUndefined();
        expect( parseFormSubmitCallback("") ).toBeUndefined();
        expect( parseFormSubmitCallback([]) ).toBeUndefined();
        expect( parseFormSubmitCallback([123]) ).toBeUndefined();
        expect( parseFormSubmitCallback(["123"]) ).toBeUndefined();
        expect( parseFormSubmitCallback(["Hello world", "foo"]) ).toBeUndefined();
        expect( parseFormSubmitCallback({}) ).toBeUndefined();
        expect( parseFormSubmitCallback({"foo":"bar"}) ).toBeUndefined();
        expect( parseFormSubmitCallback({"foo":1234}) ).toBeUndefined();

    });


});

describe('FormSubmitCallback', () => {

    describe('.test', () => {

        test( 'can detect FormSubmitCallbacks', () => {

            expect( FormSubmitCallback.test(() => {}) ).toBe(true);

        });

        test( 'can detect invalid values', () => {

            expect( FormSubmitCallback.test(undefined) ).toBe(false);
            expect( FormSubmitCallback.test(null) ).toBe(false);
            expect( FormSubmitCallback.test(false) ).toBe(false);
            expect( FormSubmitCallback.test(true) ).toBe(false);
            expect( FormSubmitCallback.test(NaN) ).toBe(false);
            expect( FormSubmitCallback.test(0) ).toBe(false);
            expect( FormSubmitCallback.test(Symbol()) ).toBe(false);
            expect( FormSubmitCallback.test(1628078651664) ).toBe(false);
            expect( FormSubmitCallback.test(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
            expect( FormSubmitCallback.test(1) ).toBe(false);
            expect( FormSubmitCallback.test(12) ).toBe(false);
            expect( FormSubmitCallback.test(-12) ).toBe(false);
            expect( FormSubmitCallback.test(123) ).toBe(false);
            expect( FormSubmitCallback.test(123.99999) ).toBe(false);
            expect( FormSubmitCallback.test(-123.99999) ).toBe(false);
            expect( FormSubmitCallback.test("123") ).toBe(false);
            expect( FormSubmitCallback.test("hello") ).toBe(false);
            expect( FormSubmitCallback.test("") ).toBe(false);
            expect( FormSubmitCallback.test([]) ).toBe(false);
            expect( FormSubmitCallback.test([123]) ).toBe(false);
            expect( FormSubmitCallback.test(["123"]) ).toBe(false);
            expect( FormSubmitCallback.test(["Hello world", "foo"]) ).toBe(false);
            expect( FormSubmitCallback.test({}) ).toBe(false);
            expect( FormSubmitCallback.test({"foo":"bar"}) ).toBe(false);
            expect( FormSubmitCallback.test({"foo":1234}) ).toBe(false);

        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect( FormSubmitCallback.stringify(() => {}) ).toBe('FormSubmitCallback#()');
            expect( FormSubmitCallback.stringify((value: FormValue) => {}) ).toBe('FormSubmitCallback#(value)');

        });

        test( 'throws TypeError on incorrect values', () => {

            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(undefined) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(null) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(false) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(true) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(NaN) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(0) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(Symbol()) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(1628078651664) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(1) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(-12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(123) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(-123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify("123") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify("hello") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify("") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify([]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify([123]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(["123"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify(["Hello world", "foo"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify({}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify({"foo":"bar"}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormSubmitCallback.stringify({"foo":1234}) ).toThrow(TypeError);

        });

    });

    describe('.parse', () => {

        test( 'can parse FormSubmitCallbacks', () => {

            const callback = () => {};
            expect( FormSubmitCallback.parse(callback) ).toBe(callback);

        });

        test( 'returns undefined for invalid values', () => {

            expect( FormSubmitCallback.parse(undefined) ).toBeUndefined();
            expect( FormSubmitCallback.parse(null) ).toBeUndefined();
            expect( FormSubmitCallback.parse(false) ).toBeUndefined();
            expect( FormSubmitCallback.parse(true) ).toBeUndefined();
            expect( FormSubmitCallback.parse(NaN) ).toBeUndefined();
            expect( FormSubmitCallback.parse(0) ).toBeUndefined();
            expect( FormSubmitCallback.parse(Symbol()) ).toBeUndefined();
            expect( FormSubmitCallback.parse(1628078651664) ).toBeUndefined();
            expect( FormSubmitCallback.parse(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
            expect( FormSubmitCallback.parse(1) ).toBeUndefined();
            expect( FormSubmitCallback.parse(12) ).toBeUndefined();
            expect( FormSubmitCallback.parse(-12) ).toBeUndefined();
            expect( FormSubmitCallback.parse(123) ).toBeUndefined();
            expect( FormSubmitCallback.parse(123.99999) ).toBeUndefined();
            expect( FormSubmitCallback.parse(-123.99999) ).toBeUndefined();
            expect( FormSubmitCallback.parse("123") ).toBeUndefined();
            expect( FormSubmitCallback.parse("hello") ).toBeUndefined();
            expect( FormSubmitCallback.parse("") ).toBeUndefined();
            expect( FormSubmitCallback.parse([]) ).toBeUndefined();
            expect( FormSubmitCallback.parse([123]) ).toBeUndefined();
            expect( FormSubmitCallback.parse(["123"]) ).toBeUndefined();
            expect( FormSubmitCallback.parse(["Hello world", "foo"]) ).toBeUndefined();
            expect( FormSubmitCallback.parse({}) ).toBeUndefined();
            expect( FormSubmitCallback.parse({"foo":"bar"}) ).toBeUndefined();
            expect( FormSubmitCallback.parse({"foo":1234}) ).toBeUndefined();

        });

    });

});
