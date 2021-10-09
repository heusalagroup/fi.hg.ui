// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormCancelCallback, { isFormCancelCallback, parseFormCancelCallback, stringifyFormCancelCallback } from "./FormCancelCallback";

describe('isFormCancelCallback', () => {

    test( 'can detect FormCancelCallbacks', () => {

        expect( isFormCancelCallback(() => {}) ).toBe(true);
        expect( isFormCancelCallback(() : string => '') ).toBe(true);
        expect( isFormCancelCallback(() : number => 123) ).toBe(true);
        expect( isFormCancelCallback(() : boolean => false) ).toBe(true);

    });

    test( 'can detect invalid values', () => {

        expect( isFormCancelCallback(undefined) ).toBe(false);
        expect( isFormCancelCallback(null) ).toBe(false);
        expect( isFormCancelCallback(false) ).toBe(false);
        expect( isFormCancelCallback(true) ).toBe(false);
        expect( isFormCancelCallback(NaN) ).toBe(false);
        expect( isFormCancelCallback(0) ).toBe(false);
        expect( isFormCancelCallback(Symbol()) ).toBe(false);
        expect( isFormCancelCallback(1628078651664) ).toBe(false);
        expect( isFormCancelCallback(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
        expect( isFormCancelCallback(1) ).toBe(false);
        expect( isFormCancelCallback(12) ).toBe(false);
        expect( isFormCancelCallback(-12) ).toBe(false);
        expect( isFormCancelCallback(123) ).toBe(false);
        expect( isFormCancelCallback(123.99999) ).toBe(false);
        expect( isFormCancelCallback(-123.99999) ).toBe(false);
        expect( isFormCancelCallback("123") ).toBe(false);
        expect( isFormCancelCallback("hello") ).toBe(false);
        expect( isFormCancelCallback("") ).toBe(false);
        expect( isFormCancelCallback([]) ).toBe(false);
        expect( isFormCancelCallback([123]) ).toBe(false);
        expect( isFormCancelCallback(["123"]) ).toBe(false);
        expect( isFormCancelCallback(["Hello world", "foo"]) ).toBe(false);
        expect( isFormCancelCallback({}) ).toBe(false);
        expect( isFormCancelCallback({"foo":"bar"}) ).toBe(false);
        expect( isFormCancelCallback({"foo":1234}) ).toBe(false);

    });

});

describe('stringifyFormCancelCallback', () => {

    test( 'can stringify values', () => {

        expect(stringifyFormCancelCallback(() => {})).toBe('FormCancelCallback#()');
        expect(stringifyFormCancelCallback(() : string => '')).toBe('FormCancelCallback#()');
        expect(stringifyFormCancelCallback(() : number => 123)).toBe('FormCancelCallback#()');
        expect(stringifyFormCancelCallback(() : boolean => false)).toBe('FormCancelCallback#()');

    });

    test( 'throws TypeError on incorrect values', () => {

        // @ts-ignore
        expect( () => stringifyFormCancelCallback(undefined) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(null) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(false) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(true) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(NaN) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(0) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(Symbol()) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(1628078651664) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(1) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(-12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(123) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(-123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback("123") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback("hello") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback("") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback([]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback([123]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(["123"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback(["Hello world", "foo"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback({}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback({"foo":"bar"}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormCancelCallback({"foo":1234}) ).toThrow(TypeError);

    });

});

describe('parseFormCancelCallback', () => {

    test( 'can parse FormCancelCallbacks', () => {

        const callback = () => {};
        expect( parseFormCancelCallback(callback) ).toStrictEqual(callback);

    });

    test( 'returns undefined for invalid values', () => {

        expect( parseFormCancelCallback(undefined) ).toBeUndefined();
        expect( parseFormCancelCallback(null) ).toBeUndefined();
        expect( parseFormCancelCallback(false) ).toBeUndefined();
        expect( parseFormCancelCallback(true) ).toBeUndefined();
        expect( parseFormCancelCallback(NaN) ).toBeUndefined();
        expect( parseFormCancelCallback(0) ).toBeUndefined();
        expect( parseFormCancelCallback(Symbol()) ).toBeUndefined();
        expect( parseFormCancelCallback(1628078651664) ).toBeUndefined();
        expect( parseFormCancelCallback(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
        expect( parseFormCancelCallback(1) ).toBeUndefined();
        expect( parseFormCancelCallback(12) ).toBeUndefined();
        expect( parseFormCancelCallback(-12) ).toBeUndefined();
        expect( parseFormCancelCallback(123) ).toBeUndefined();
        expect( parseFormCancelCallback(123.99999) ).toBeUndefined();
        expect( parseFormCancelCallback(-123.99999) ).toBeUndefined();
        expect( parseFormCancelCallback("123") ).toBeUndefined();
        expect( parseFormCancelCallback("hello") ).toBeUndefined();
        expect( parseFormCancelCallback("") ).toBeUndefined();
        expect( parseFormCancelCallback([]) ).toBeUndefined();
        expect( parseFormCancelCallback([123]) ).toBeUndefined();
        expect( parseFormCancelCallback(["123"]) ).toBeUndefined();
        expect( parseFormCancelCallback(["Hello world", "foo"]) ).toBeUndefined();
        expect( parseFormCancelCallback({}) ).toBeUndefined();
        expect( parseFormCancelCallback({"foo":"bar"}) ).toBeUndefined();
        expect( parseFormCancelCallback({"foo":1234}) ).toBeUndefined();

    });

});

describe('FormCancelCallback', () => {

    describe('.test', () => {

        test( 'can detect FormCancelCallbacks', () => {

            expect( FormCancelCallback.test(() => {}) ).toBe(true);
            expect( FormCancelCallback.test(() : string => '') ).toBe(true);
            expect( FormCancelCallback.test(() : number => 123) ).toBe(true);
            expect( FormCancelCallback.test(() : boolean => false) ).toBe(true);

        });

        test( 'can detect invalid values', () => {

            expect( FormCancelCallback.test(undefined) ).toBe(false);
            expect( FormCancelCallback.test(null) ).toBe(false);
            expect( FormCancelCallback.test(false) ).toBe(false);
            expect( FormCancelCallback.test(true) ).toBe(false);
            expect( FormCancelCallback.test(NaN) ).toBe(false);
            expect( FormCancelCallback.test(0) ).toBe(false);
            expect( FormCancelCallback.test(Symbol()) ).toBe(false);
            expect( FormCancelCallback.test(1628078651664) ).toBe(false);
            expect( FormCancelCallback.test(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
            expect( FormCancelCallback.test(1) ).toBe(false);
            expect( FormCancelCallback.test(12) ).toBe(false);
            expect( FormCancelCallback.test(-12) ).toBe(false);
            expect( FormCancelCallback.test(123) ).toBe(false);
            expect( FormCancelCallback.test(123.99999) ).toBe(false);
            expect( FormCancelCallback.test(-123.99999) ).toBe(false);
            expect( FormCancelCallback.test("123") ).toBe(false);
            expect( FormCancelCallback.test("hello") ).toBe(false);
            expect( FormCancelCallback.test("") ).toBe(false);
            expect( FormCancelCallback.test([]) ).toBe(false);
            expect( FormCancelCallback.test([123]) ).toBe(false);
            expect( FormCancelCallback.test(["123"]) ).toBe(false);
            expect( FormCancelCallback.test(["Hello world", "foo"]) ).toBe(false);
            expect( FormCancelCallback.test({}) ).toBe(false);
            expect( FormCancelCallback.test({"foo":"bar"}) ).toBe(false);
            expect( FormCancelCallback.test({"foo":1234}) ).toBe(false);

        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect(FormCancelCallback.stringify(() => {})).toBe('FormCancelCallback#()');
            expect(FormCancelCallback.stringify(() : string => '')).toBe('FormCancelCallback#()');
            expect(FormCancelCallback.stringify(() : number => 123)).toBe('FormCancelCallback#()');
            expect(FormCancelCallback.stringify(() : boolean => false)).toBe('FormCancelCallback#()');

        });

        test( 'throws TypeError on incorrect values', () => {

            // @ts-ignore
            expect( () => FormCancelCallback.stringify(undefined) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(null) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(false) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(true) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(NaN) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(0) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(Symbol()) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(1628078651664) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(1) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(-12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(123) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(-123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify("123") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify("hello") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify("") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify([]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify([123]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(["123"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify(["Hello world", "foo"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify({}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify({"foo":"bar"}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormCancelCallback.stringify({"foo":1234}) ).toThrow(TypeError);

        });

    });

    describe('.parse', () => {

        test( 'can parse FormCancelCallbacks', () => {

            const callback = () => {};
            expect(FormCancelCallback.parse(callback)).toStrictEqual(callback);

        });

        test( 'returns undefined for invalid values', () => {

            expect( FormCancelCallback.parse(undefined) ).toBeUndefined();
            expect( FormCancelCallback.parse(null) ).toBeUndefined();
            expect( FormCancelCallback.parse(false) ).toBeUndefined();
            expect( FormCancelCallback.parse(true) ).toBeUndefined();
            expect( FormCancelCallback.parse(NaN) ).toBeUndefined();
            expect( FormCancelCallback.parse(0) ).toBeUndefined();
            expect( FormCancelCallback.parse(Symbol()) ).toBeUndefined();
            expect( FormCancelCallback.parse(1628078651664) ).toBeUndefined();
            expect( FormCancelCallback.parse(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
            expect( FormCancelCallback.parse(1) ).toBeUndefined();
            expect( FormCancelCallback.parse(12) ).toBeUndefined();
            expect( FormCancelCallback.parse(-12) ).toBeUndefined();
            expect( FormCancelCallback.parse(123) ).toBeUndefined();
            expect( FormCancelCallback.parse(123.99999) ).toBeUndefined();
            expect( FormCancelCallback.parse(-123.99999) ).toBeUndefined();
            expect( FormCancelCallback.parse("123") ).toBeUndefined();
            expect( FormCancelCallback.parse("hello") ).toBeUndefined();
            expect( FormCancelCallback.parse("") ).toBeUndefined();
            expect( FormCancelCallback.parse([]) ).toBeUndefined();
            expect( FormCancelCallback.parse([123]) ).toBeUndefined();
            expect( FormCancelCallback.parse(["123"]) ).toBeUndefined();
            expect( FormCancelCallback.parse(["Hello world", "foo"]) ).toBeUndefined();
            expect( FormCancelCallback.parse({}) ).toBeUndefined();
            expect( FormCancelCallback.parse({"foo":"bar"}) ).toBeUndefined();
            expect( FormCancelCallback.parse({"foo":1234}) ).toBeUndefined();

        });

    });

});
