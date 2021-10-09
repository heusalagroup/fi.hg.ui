// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormControllerAction, { isFormControllerAction, parseFormControllerAction, stringifyFormControllerAction } from "./FormControllerAction";
import { FormValue } from "../../components/types/FormValue";

describe('isFormControllerAction', () => {

    test( 'can detect FormControllerActions', () => {

        expect( isFormControllerAction('http://localhost:3000/api/form') ).toBe(true);
        expect( isFormControllerAction({method: 'put', url: 'http://localhost:3000/api/form'}) ).toBe(true);
        expect( isFormControllerAction(() => {}) ).toBe(true);
        expect( isFormControllerAction((value: FormValue) => {}) ).toBe(true);
        expect( isFormControllerAction({}) ).toBe(true);

    });

    test( 'can detect invalid values', () => {

        expect( isFormControllerAction(undefined) ).toBe(false);
        expect( isFormControllerAction(null) ).toBe(false);
        expect( isFormControllerAction(false) ).toBe(false);
        expect( isFormControllerAction(true) ).toBe(false);
        expect( isFormControllerAction(NaN) ).toBe(false);
        expect( isFormControllerAction(0) ).toBe(false);
        expect( isFormControllerAction(Symbol()) ).toBe(false);
        expect( isFormControllerAction(1628078651664) ).toBe(false);
        expect( isFormControllerAction(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
        expect( isFormControllerAction(1) ).toBe(false);
        expect( isFormControllerAction(12) ).toBe(false);
        expect( isFormControllerAction(-12) ).toBe(false);
        expect( isFormControllerAction(123) ).toBe(false);
        expect( isFormControllerAction(123.99999) ).toBe(false);
        expect( isFormControllerAction(-123.99999) ).toBe(false);
        expect( isFormControllerAction([]) ).toBe(false);
        expect( isFormControllerAction([123]) ).toBe(false);
        expect( isFormControllerAction(["123"]) ).toBe(false);
        expect( isFormControllerAction(["Hello world", "foo"]) ).toBe(false);
        expect( isFormControllerAction({"foo":"bar"}) ).toBe(false);
        expect( isFormControllerAction({"foo":1234}) ).toBe(false);

    });

});

describe('stringifyFormControllerAction', () => {

    test( 'can stringify values', () => {

        expect( stringifyFormControllerAction('') ).toBe('FormControllerAction(JsonHttpAction(POST))');

        expect( stringifyFormControllerAction('http://localhost:3000/api/form') ).toBe('FormControllerAction(JsonHttpAction(POST http://localhost:3000/api/form))');

        // @ts-ignore
        expect( stringifyFormControllerAction({method: 'put', url: 'http://localhost:3000/api/form'}) ).toBe('FormControllerAction(JsonHttpAction(PUT http://localhost:3000/api/form))');

        expect( stringifyFormControllerAction(() => {}) ).toBe('FormControllerAction(FormSubmitCallback#())');

        expect( stringifyFormControllerAction((value: FormValue) => {}) ).toBe('FormControllerAction(FormSubmitCallback#(value))');

        expect( stringifyFormControllerAction({}) ).toBe('FormControllerAction(JsonHttpAction(POST))');

        expect( stringifyFormControllerAction("123") ).toBe('FormControllerAction(JsonHttpAction(POST 123))');
        expect( stringifyFormControllerAction("hello") ).toBe('FormControllerAction(JsonHttpAction(POST hello))');

    });

    test( 'throws TypeError on incorrect values', () => {

        // @ts-ignore
        expect( () => stringifyFormControllerAction(undefined) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(null) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(false) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(true) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(NaN) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(0) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(Symbol()) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(1628078651664) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(1) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(-12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(123) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(-123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction([]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction([123]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(["123"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction(["Hello world", "foo"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction({"foo":"bar"}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormControllerAction({"foo":1234}) ).toThrow(TypeError);

    });

});

describe('parseFormControllerAction', () => {

    test( 'can parse FormControllerActions', () => {

        const callback = () => {};
        expect( parseFormControllerAction(callback) ).toBe(callback);

        expect( parseFormControllerAction("123") ).toStrictEqual({"url": "123"});
        expect( parseFormControllerAction("hello") ).toStrictEqual({"url": "hello"});
        expect( parseFormControllerAction("") ).toStrictEqual({});
        expect( parseFormControllerAction({}) ).toStrictEqual({});

    });

    test( 'returns undefined for invalid values', () => {

        expect( parseFormControllerAction(undefined) ).toBeUndefined();
        expect( parseFormControllerAction(null) ).toBeUndefined();
        expect( parseFormControllerAction(false) ).toBeUndefined();
        expect( parseFormControllerAction(true) ).toBeUndefined();
        expect( parseFormControllerAction(NaN) ).toBeUndefined();
        expect( parseFormControllerAction(0) ).toBeUndefined();
        expect( parseFormControllerAction(Symbol()) ).toBeUndefined();
        expect( parseFormControllerAction(1628078651664) ).toBeUndefined();
        expect( parseFormControllerAction(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
        expect( parseFormControllerAction(1) ).toBeUndefined();
        expect( parseFormControllerAction(12) ).toBeUndefined();
        expect( parseFormControllerAction(-12) ).toBeUndefined();
        expect( parseFormControllerAction(123) ).toBeUndefined();
        expect( parseFormControllerAction(123.99999) ).toBeUndefined();
        expect( parseFormControllerAction(-123.99999) ).toBeUndefined();
        expect( parseFormControllerAction([]) ).toBeUndefined();
        expect( parseFormControllerAction([123]) ).toBeUndefined();
        expect( parseFormControllerAction(["123"]) ).toBeUndefined();
        expect( parseFormControllerAction(["Hello world", "foo"]) ).toBeUndefined();
        expect( parseFormControllerAction({"foo":"bar"}) ).toBeUndefined();
        expect( parseFormControllerAction({"foo":1234}) ).toBeUndefined();

    });

});

describe('FormControllerAction', () => {

    describe('.test', () => {

        test( 'can detect FormControllerActions', () => {

            expect( FormControllerAction.test("123") ).toBe(true);
            expect( FormControllerAction.test("hello") ).toBe(true);
            expect( FormControllerAction.test("") ).toBe(true);
            expect( FormControllerAction.test('http://localhost:3000/api/form') ).toBe(true);
            expect( FormControllerAction.test({method: 'put', url: 'http://localhost:3000/api/form'}) ).toBe(true);
            expect( FormControllerAction.test(() => {}) ).toBe(true);
            expect( FormControllerAction.test((value: FormValue) => {}) ).toBe(true);
            expect( FormControllerAction.test({}) ).toBe(true);

        });

        test( 'can detect invalid values', () => {

            expect( FormControllerAction.test(undefined) ).toBe(false);
            expect( FormControllerAction.test(null) ).toBe(false);
            expect( FormControllerAction.test(false) ).toBe(false);
            expect( FormControllerAction.test(true) ).toBe(false);
            expect( FormControllerAction.test(NaN) ).toBe(false);
            expect( FormControllerAction.test(0) ).toBe(false);
            expect( FormControllerAction.test(Symbol()) ).toBe(false);
            expect( FormControllerAction.test(1628078651664) ).toBe(false);
            expect( FormControllerAction.test(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
            expect( FormControllerAction.test(1) ).toBe(false);
            expect( FormControllerAction.test(12) ).toBe(false);
            expect( FormControllerAction.test(-12) ).toBe(false);
            expect( FormControllerAction.test(123) ).toBe(false);
            expect( FormControllerAction.test(123.99999) ).toBe(false);
            expect( FormControllerAction.test(-123.99999) ).toBe(false);
            expect( FormControllerAction.test([]) ).toBe(false);
            expect( FormControllerAction.test([123]) ).toBe(false);
            expect( FormControllerAction.test(["123"]) ).toBe(false);
            expect( FormControllerAction.test(["Hello world", "foo"]) ).toBe(false);
            expect( FormControllerAction.test({"foo":"bar"}) ).toBe(false);
            expect( FormControllerAction.test({"foo":1234}) ).toBe(false);

        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect( FormControllerAction.stringify('') ).toBe('FormControllerAction(JsonHttpAction(POST))');

            expect( FormControllerAction.stringify('http://localhost:3000/api/form') ).toBe('FormControllerAction(JsonHttpAction(POST http://localhost:3000/api/form))');

            // @ts-ignore
            expect( FormControllerAction.stringify({method: 'put', url: 'http://localhost:3000/api/form'}) ).toBe('FormControllerAction(JsonHttpAction(PUT http://localhost:3000/api/form))');

            expect( FormControllerAction.stringify(() => {}) ).toBe('FormControllerAction(FormSubmitCallback#())');

            expect( FormControllerAction.stringify((value: FormValue) => {}) ).toBe('FormControllerAction(FormSubmitCallback#(value))');

            expect( FormControllerAction.stringify({}) ).toBe('FormControllerAction(JsonHttpAction(POST))');

        });

        test( 'throws TypeError on incorrect values', () => {

            // @ts-ignore
            expect( () => FormControllerAction.stringify(undefined) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(null) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(false) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(true) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(NaN) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(0) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(Symbol()) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(1628078651664) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(1) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(-12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(123) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(-123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify([]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify([123]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(["123"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify(["Hello world", "foo"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify({"foo":"bar"}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormControllerAction.stringify({"foo":1234}) ).toThrow(TypeError);

        });

    });

    describe('.parse', () => {

        test( 'can parse FormControllerActions', () => {

            const callback = () => {};
            expect( FormControllerAction.parse(callback) ).toBe(callback);

        });

        test( 'returns undefined for invalid values', () => {

            expect( FormControllerAction.parse(undefined) ).toBeUndefined();
            expect( FormControllerAction.parse(null) ).toBeUndefined();
            expect( FormControllerAction.parse(false) ).toBeUndefined();
            expect( FormControllerAction.parse(true) ).toBeUndefined();
            expect( FormControllerAction.parse(NaN) ).toBeUndefined();
            expect( FormControllerAction.parse(0) ).toBeUndefined();
            expect( FormControllerAction.parse(Symbol()) ).toBeUndefined();
            expect( FormControllerAction.parse(1628078651664) ).toBeUndefined();
            expect( FormControllerAction.parse(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
            expect( FormControllerAction.parse(1) ).toBeUndefined();
            expect( FormControllerAction.parse(12) ).toBeUndefined();
            expect( FormControllerAction.parse(-12) ).toBeUndefined();
            expect( FormControllerAction.parse(123) ).toBeUndefined();
            expect( FormControllerAction.parse(123.99999) ).toBeUndefined();
            expect( FormControllerAction.parse(-123.99999) ).toBeUndefined();
            expect( FormControllerAction.parse([]) ).toBeUndefined();
            expect( FormControllerAction.parse([123]) ).toBeUndefined();
            expect( FormControllerAction.parse(["123"]) ).toBeUndefined();
            expect( FormControllerAction.parse(["Hello world", "foo"]) ).toBeUndefined();
            expect( FormControllerAction.parse({"foo":"bar"}) ).toBeUndefined();
            expect( FormControllerAction.parse({"foo":1234}) ).toBeUndefined();

        });

    });

});
