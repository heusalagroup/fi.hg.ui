// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormController, { isFormController, parseFormController, stringifyFormController } from "./FormController";
import FormItemType from "../../components/types/FormItemType";

describe('isFormController', () => {

    test( 'can detect FormControllers', () => {

        expect( isFormController({
            model: {
                title: 'Headline',
                items: []
            }
        }) ).toBe(true);

        expect( isFormController({
            model: {
                title: 'Headline',
                items: [
                    {
                        type: FormItemType.EMAIL_FIELD,
                        key: 'user.email'
                    }
                ]
            },
            value: {
                user: {
                    email: 'foo@example.com'
                }
            }
        }) ).toBe(true);

        expect( isFormController({
            model: {
                title: 'Headline',
                items: [
                    {
                        type: FormItemType.TEXT_FIELD,
                        key: 'username'
                    }
                ]
            },
            value: {
                username: 'foo@example.com'
            }
        }) ).toBe(true);

    });

    test( 'can detect invalid values', () => {

        expect( isFormController(undefined) ).toBe(false);
        expect( isFormController(null) ).toBe(false);
        expect( isFormController(false) ).toBe(false);
        expect( isFormController(true) ).toBe(false);
        expect( isFormController(NaN) ).toBe(false);
        expect( isFormController(() => {}) ).toBe(false);
        expect( isFormController(0) ).toBe(false);
        expect( isFormController(Symbol()) ).toBe(false);
        expect( isFormController(1628078651664) ).toBe(false);
        expect( isFormController(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
        expect( isFormController(1) ).toBe(false);
        expect( isFormController(12) ).toBe(false);
        expect( isFormController(-12) ).toBe(false);
        expect( isFormController(123) ).toBe(false);
        expect( isFormController(123.99999) ).toBe(false);
        expect( isFormController(-123.99999) ).toBe(false);
        expect( isFormController("123") ).toBe(false);
        expect( isFormController("hello") ).toBe(false);
        expect( isFormController("") ).toBe(false);
        expect( isFormController([]) ).toBe(false);
        expect( isFormController([123]) ).toBe(false);
        expect( isFormController(["123"]) ).toBe(false);
        expect( isFormController(["Hello world", "foo"]) ).toBe(false);
        expect( isFormController({}) ).toBe(false);
        expect( isFormController({"foo":"bar"}) ).toBe(false);
        expect( isFormController({"foo":1234}) ).toBe(false);

    });

});

describe('stringifyFormController', () => {

    test( 'can stringify values', () => {

        expect( stringifyFormController({
            model: {
                title: 'Headline',
                items: []
            }
        }) ).toBe('FormController("Headline")');

    });

    test( 'throws TypeError on incorrect values', () => {

        // @ts-ignore
        expect( () => stringifyFormController(undefined) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(null) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(false) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(true) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(NaN) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(() => {}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(0) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(Symbol()) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(1628078651664) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(1) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(-12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(123) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(-123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController("123") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController("hello") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController("") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController([]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController([123]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(["123"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController(["Hello world", "foo"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController({}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController({"foo":"bar"}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyFormController({"foo":1234}) ).toThrow(TypeError);

    });

});

describe('parseFormController', () => {

    test( 'can parse FormControllers', () => {

        const testValue = {
            model: {
                title: 'Headline',
                items: []
            }
        };
        expect( parseFormController(testValue) ).toStrictEqual(testValue);

    });

    test( 'returns undefined for invalid values', () => {

        expect( parseFormController(undefined) ).toBeUndefined();
        expect( parseFormController(null) ).toBeUndefined();
        expect( parseFormController(false) ).toBeUndefined();
        expect( parseFormController(true) ).toBeUndefined();
        expect( parseFormController(NaN) ).toBeUndefined();
        expect( parseFormController(() => {}) ).toBeUndefined();
        expect( parseFormController(0) ).toBeUndefined();
        expect( parseFormController(Symbol()) ).toBeUndefined();
        expect( parseFormController(1628078651664) ).toBeUndefined();
        expect( parseFormController(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
        expect( parseFormController(1) ).toBeUndefined();
        expect( parseFormController(12) ).toBeUndefined();
        expect( parseFormController(-12) ).toBeUndefined();
        expect( parseFormController(123) ).toBeUndefined();
        expect( parseFormController(123.99999) ).toBeUndefined();
        expect( parseFormController(-123.99999) ).toBeUndefined();
        expect( parseFormController("123") ).toBeUndefined();
        expect( parseFormController("hello") ).toBeUndefined();
        expect( parseFormController("") ).toBeUndefined();
        expect( parseFormController([]) ).toBeUndefined();
        expect( parseFormController([123]) ).toBeUndefined();
        expect( parseFormController(["123"]) ).toBeUndefined();
        expect( parseFormController(["Hello world", "foo"]) ).toBeUndefined();
        expect( parseFormController({}) ).toBeUndefined();
        expect( parseFormController({"foo":"bar"}) ).toBeUndefined();
        expect( parseFormController({"foo":1234}) ).toBeUndefined();

    });


});

describe('FormController', () => {

    describe('.test', () => {

        test( 'can detect FormControllers', () => {

            expect( FormController.test({
                model: {
                    title: 'Headline',
                    items: []
                }
            }) ).toBe(true);

        });

        test( 'can detect invalid values', () => {

            expect( FormController.test(undefined) ).toBe(false);
            expect( FormController.test(null) ).toBe(false);
            expect( FormController.test(false) ).toBe(false);
            expect( FormController.test(true) ).toBe(false);
            expect( FormController.test(NaN) ).toBe(false);
            expect( FormController.test(() => {}) ).toBe(false);
            expect( FormController.test(0) ).toBe(false);
            expect( FormController.test(Symbol()) ).toBe(false);
            expect( FormController.test(1628078651664) ).toBe(false);
            expect( FormController.test(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
            expect( FormController.test(1) ).toBe(false);
            expect( FormController.test(12) ).toBe(false);
            expect( FormController.test(-12) ).toBe(false);
            expect( FormController.test(123) ).toBe(false);
            expect( FormController.test(123.99999) ).toBe(false);
            expect( FormController.test(-123.99999) ).toBe(false);
            expect( FormController.test("123") ).toBe(false);
            expect( FormController.test("hello") ).toBe(false);
            expect( FormController.test("") ).toBe(false);
            expect( FormController.test([]) ).toBe(false);
            expect( FormController.test([123]) ).toBe(false);
            expect( FormController.test(["123"]) ).toBe(false);
            expect( FormController.test(["Hello world", "foo"]) ).toBe(false);
            expect( FormController.test({}) ).toBe(false);
            expect( FormController.test({"foo":"bar"}) ).toBe(false);
            expect( FormController.test({"foo":1234}) ).toBe(false);

        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect( FormController.stringify({
                model: {
                    title: 'Headline',
                    items: []
                }
            }) ).toBe('FormController("Headline")');

        });

        test( 'throws TypeError on incorrect values', () => {

            // @ts-ignore
            expect( () => FormController.stringify(undefined) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(null) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(false) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(true) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(NaN) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(() => {}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(0) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(Symbol()) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(1628078651664) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(1) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(-12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(123) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(-123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify("123") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify("hello") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify("") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify([]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify([123]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(["123"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify(["Hello world", "foo"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify({}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify({"foo":"bar"}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => FormController.stringify({"foo":1234}) ).toThrow(TypeError);

        });

    });

    describe('.parse', () => {

        test( 'can parse FormControllers', () => {

            const testValue = {
                model: {
                    title: 'Headline',
                    items: []
                }
            };
            expect( FormController.parse(testValue) ).toStrictEqual(testValue);

        });

        test( 'returns undefined for invalid values', () => {

            expect( FormController.parse(undefined) ).toBeUndefined();
            expect( FormController.parse(null) ).toBeUndefined();
            expect( FormController.parse(false) ).toBeUndefined();
            expect( FormController.parse(true) ).toBeUndefined();
            expect( FormController.parse(NaN) ).toBeUndefined();
            expect( FormController.parse(() => {}) ).toBeUndefined();
            expect( FormController.parse(0) ).toBeUndefined();
            expect( FormController.parse(Symbol()) ).toBeUndefined();
            expect( FormController.parse(1628078651664) ).toBeUndefined();
            expect( FormController.parse(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
            expect( FormController.parse(1) ).toBeUndefined();
            expect( FormController.parse(12) ).toBeUndefined();
            expect( FormController.parse(-12) ).toBeUndefined();
            expect( FormController.parse(123) ).toBeUndefined();
            expect( FormController.parse(123.99999) ).toBeUndefined();
            expect( FormController.parse(-123.99999) ).toBeUndefined();
            expect( FormController.parse("123") ).toBeUndefined();
            expect( FormController.parse("hello") ).toBeUndefined();
            expect( FormController.parse("") ).toBeUndefined();
            expect( FormController.parse([]) ).toBeUndefined();
            expect( FormController.parse([123]) ).toBeUndefined();
            expect( FormController.parse(["123"]) ).toBeUndefined();
            expect( FormController.parse(["Hello world", "foo"]) ).toBeUndefined();
            expect( FormController.parse({}) ).toBeUndefined();
            expect( FormController.parse({"foo":"bar"}) ).toBeUndefined();
            expect( FormController.parse({"foo":1234}) ).toBeUndefined();

        });

    });

});
