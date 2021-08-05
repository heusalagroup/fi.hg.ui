import HttpStatusCode, {
    isHttpStatusCode,
    parseHttpStatusCode,
    parseHttpStatusCodeString,
    stringifyHttpStatusCode
} from "./HttpStatusCode";

describe('isHttpStatusCode', () => {

    test( 'can detect HttpStatusCodes', () => {

        expect( isHttpStatusCode(200) ).toBe(true);
        expect( isHttpStatusCode(404) ).toBe(true);
        expect( isHttpStatusCode(500) ).toBe(true);
        expect( isHttpStatusCode([200, 299]) ).toBe(true);
        expect( isHttpStatusCode([200, 399]) ).toBe(true);
        expect( isHttpStatusCode([400, 499]) ).toBe(true);
        expect( isHttpStatusCode([500, 599]) ).toBe(true);

    });

    test( 'can detect invalid values', () => {

        expect( isHttpStatusCode(undefined) ).toBe(false);
        expect( isHttpStatusCode(null) ).toBe(false);
        expect( isHttpStatusCode(false) ).toBe(false);
        expect( isHttpStatusCode(true) ).toBe(false);
        expect( isHttpStatusCode(NaN) ).toBe(false);
        expect( isHttpStatusCode(() => {}) ).toBe(false);
        expect( isHttpStatusCode(0) ).toBe(false);
        expect( isHttpStatusCode(Symbol()) ).toBe(false);
        expect( isHttpStatusCode(1628078651664) ).toBe(false);
        expect( isHttpStatusCode(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
        expect( isHttpStatusCode(-12) ).toBe(false);
        expect( isHttpStatusCode(123.99999) ).toBe(false);
        expect( isHttpStatusCode(-123.99999) ).toBe(false);
        expect( isHttpStatusCode("123") ).toBe(false);
        expect( isHttpStatusCode("hello") ).toBe(false);
        expect( isHttpStatusCode("") ).toBe(false);
        expect( isHttpStatusCode([]) ).toBe(false);
        expect( isHttpStatusCode([123]) ).toBe(false);
        expect( isHttpStatusCode(["123"]) ).toBe(false);
        expect( isHttpStatusCode(["Hello world", "foo"]) ).toBe(false);
        expect( isHttpStatusCode({}) ).toBe(false);
        expect( isHttpStatusCode({"foo":"bar"}) ).toBe(false);
        expect( isHttpStatusCode({"foo":1234}) ).toBe(false);

        expect( isHttpStatusCode([200, 200]) ).toBe(false);
        expect( isHttpStatusCode([299, 200]) ).toBe(false);
        expect( isHttpStatusCode([399, 200]) ).toBe(false);
        expect( isHttpStatusCode([499, 400]) ).toBe(false);
        expect( isHttpStatusCode([599, 500]) ).toBe(false);

    });

});

describe('stringifyHttpStatusCode', () => {

    test( 'can stringify values', () => {

        expect( stringifyHttpStatusCode(100) ).toBe('HttpStatusCode#100');
        expect( stringifyHttpStatusCode(200) ).toBe('HttpStatusCode#200');
        expect( stringifyHttpStatusCode([200,299]) ).toBe('HttpStatusCode#200-299');

    });

    test( 'throws TypeError on incorrect values', () => {

        // @ts-ignore
        expect( () => stringifyHttpStatusCode(undefined) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(null) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(false) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(true) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(NaN) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(() => {}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(0) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(Symbol()) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(1628078651664) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(-12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(-123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode("123") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode("hello") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode("") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode([]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode([123]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode([123, 300, 400]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(["123"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode(["Hello world", "foo"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode({}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode({"foo":"bar"}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyHttpStatusCode({"foo":1234}) ).toThrow(TypeError);

        expect( () => stringifyHttpStatusCode([200,200]) ).toThrow(TypeError);
        expect( () => stringifyHttpStatusCode([299,200]) ).toThrow(TypeError);

    });

});

describe('parseHttpStatusCode', () => {

    test( 'can parse HttpStatusCodes', () => {

        expect( parseHttpStatusCode(200) ).toStrictEqual(200);
        expect( parseHttpStatusCode([200,299]) ).toStrictEqual([200,299]);
        expect( parseHttpStatusCode([299,200]) ).toStrictEqual([200,299]);
        expect( parseHttpStatusCode(["200",299]) ).toStrictEqual([200,299]);
        expect( parseHttpStatusCode(["200","299"]) ).toStrictEqual([200,299]);
        expect( parseHttpStatusCode([200,"299"]) ).toStrictEqual([200,299]);
        expect( parseHttpStatusCode("200") ).toStrictEqual(200);
        expect( parseHttpStatusCode("200-299") ).toStrictEqual([200,299]);
        expect( parseHttpStatusCode("HttpStatusCode#516") ).toStrictEqual(516);
        expect( parseHttpStatusCode("HttpStatusCode#200..399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200-399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200 399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200<399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200>399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200+399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200|399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200/399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200#399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200&399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200,399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200\t399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200\n399") ).toStrictEqual([200,399]);
        expect( parseHttpStatusCode("HttpStatusCode#200...399") ).toStrictEqual([200,399]);

    });

    test( 'returns undefined for invalid values', () => {

        expect( parseHttpStatusCode(undefined) ).toBeUndefined();
        expect( parseHttpStatusCode(null) ).toBeUndefined();
        expect( parseHttpStatusCode(false) ).toBeUndefined();
        expect( parseHttpStatusCode(true) ).toBeUndefined();
        expect( parseHttpStatusCode(NaN) ).toBeUndefined();
        expect( parseHttpStatusCode(() => {}) ).toBeUndefined();
        expect( parseHttpStatusCode(0) ).toBeUndefined();
        expect( parseHttpStatusCode(Symbol()) ).toBeUndefined();
        expect( parseHttpStatusCode(1628078651664) ).toBeUndefined();
        expect( parseHttpStatusCode(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
        expect( parseHttpStatusCode(-12) ).toBeUndefined();
        expect( parseHttpStatusCode(123.99999) ).toBeUndefined();
        expect( parseHttpStatusCode(-123.99999) ).toBeUndefined();
        expect( parseHttpStatusCode("hello") ).toBeUndefined();
        expect( parseHttpStatusCode("") ).toBeUndefined();
        expect( parseHttpStatusCode([]) ).toBeUndefined();
        expect( parseHttpStatusCode([123]) ).toBeUndefined();
        expect( parseHttpStatusCode([123, 555, 344]) ).toBeUndefined();
        expect( parseHttpStatusCode(["123"]) ).toBeUndefined();
        expect( parseHttpStatusCode(["123", "555", "344"]) ).toBeUndefined();
        expect( parseHttpStatusCode(["Hello world", "foo"]) ).toBeUndefined();
        expect( parseHttpStatusCode({}) ).toBeUndefined();
        expect( parseHttpStatusCode({"foo":"bar"}) ).toBeUndefined();
        expect( parseHttpStatusCode({"foo":1234}) ).toBeUndefined();

    });

});

describe('HttpStatusCode', () => {

    describe('.test', () => {

        test( 'can detect HttpStatusCodes', () => {

            expect( HttpStatusCode.test(200) ).toBe(true);
            expect( HttpStatusCode.test(404) ).toBe(true);
            expect( HttpStatusCode.test(500) ).toBe(true);
            expect( HttpStatusCode.test([200, 299]) ).toBe(true);
            expect( HttpStatusCode.test([200, 399]) ).toBe(true);
            expect( HttpStatusCode.test([400, 499]) ).toBe(true);
            expect( HttpStatusCode.test([500, 599]) ).toBe(true);

        });

        test( 'can detect invalid values', () => {

            expect( HttpStatusCode.test(undefined) ).toBe(false);
            expect( HttpStatusCode.test(null) ).toBe(false);
            expect( HttpStatusCode.test(false) ).toBe(false);
            expect( HttpStatusCode.test(true) ).toBe(false);
            expect( HttpStatusCode.test(NaN) ).toBe(false);
            expect( HttpStatusCode.test(() => {}) ).toBe(false);
            expect( HttpStatusCode.test(0) ).toBe(false);
            expect( HttpStatusCode.test(Symbol()) ).toBe(false);
            expect( HttpStatusCode.test(1628078651664) ).toBe(false);
            expect( HttpStatusCode.test(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
            expect( HttpStatusCode.test(-12) ).toBe(false);
            expect( HttpStatusCode.test(123.99999) ).toBe(false);
            expect( HttpStatusCode.test(-123.99999) ).toBe(false);
            expect( HttpStatusCode.test("123") ).toBe(false);
            expect( HttpStatusCode.test("hello") ).toBe(false);
            expect( HttpStatusCode.test("") ).toBe(false);
            expect( HttpStatusCode.test([]) ).toBe(false);
            expect( HttpStatusCode.test([123]) ).toBe(false);
            expect( HttpStatusCode.test(["123"]) ).toBe(false);
            expect( HttpStatusCode.test(["Hello world", "foo"]) ).toBe(false);
            expect( HttpStatusCode.test({}) ).toBe(false);
            expect( HttpStatusCode.test({"foo":"bar"}) ).toBe(false);
            expect( HttpStatusCode.test({"foo":1234}) ).toBe(false);

        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect( HttpStatusCode.stringify(100) ).toBe('HttpStatusCode#100');
            expect( HttpStatusCode.stringify(200) ).toBe('HttpStatusCode#200');
            expect( HttpStatusCode.stringify([200,299]) ).toBe('HttpStatusCode#200-299');

        });

        test( 'throws TypeError on incorrect values', () => {

            // @ts-ignore
            expect( () => HttpStatusCode.stringify(undefined) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(null) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(false) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(true) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(NaN) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(() => {}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(0) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(Symbol()) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(1628078651664) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(1) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(-12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(-123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify("123") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify("hello") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify("") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify([]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify([123]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(["123"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify(["Hello world", "foo"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify({}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify({"foo":"bar"}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => HttpStatusCode.stringify({"foo":1234}) ).toThrow(TypeError);

        });

    });

    describe('.parse', () => {

        test( 'can parse HttpStatusCodes', () => {

            expect( HttpStatusCode.parse(200) ).toStrictEqual(200);
            expect( HttpStatusCode.parse([200,299]) ).toStrictEqual([200,299]);
            expect( HttpStatusCode.parse(["200",299]) ).toStrictEqual([200,299]);
            expect( HttpStatusCode.parse(["200","299"]) ).toStrictEqual([200,299]);
            expect( HttpStatusCode.parse([200,"299"]) ).toStrictEqual([200,299]);
            expect( HttpStatusCode.parse("200") ).toStrictEqual(200);
            expect( HttpStatusCode.parse("200-299") ).toStrictEqual([200,299]);
            expect( HttpStatusCode.parse("HttpStatusCode#516") ).toStrictEqual(516);
            expect( HttpStatusCode.parse("HttpStatusCode#200..399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200-399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200 399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200<399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200>399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200+399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200|399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200/399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200#399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200&399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200,399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200\t399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200\n399") ).toStrictEqual([200,399]);
            expect( HttpStatusCode.parse("HttpStatusCode#200...399") ).toStrictEqual([200,399]);

        });

        test( 'returns undefined for invalid values', () => {

            expect( HttpStatusCode.parse(undefined) ).toBeUndefined();
            expect( HttpStatusCode.parse(null) ).toBeUndefined();
            expect( HttpStatusCode.parse(false) ).toBeUndefined();
            expect( HttpStatusCode.parse(true) ).toBeUndefined();
            expect( HttpStatusCode.parse(NaN) ).toBeUndefined();
            expect( HttpStatusCode.parse(() => {}) ).toBeUndefined();
            expect( HttpStatusCode.parse(0) ).toBeUndefined();
            expect( HttpStatusCode.parse(Symbol()) ).toBeUndefined();
            expect( HttpStatusCode.parse(1628078651664) ).toBeUndefined();
            expect( HttpStatusCode.parse(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
            expect( HttpStatusCode.parse(1) ).toBeUndefined();
            expect( HttpStatusCode.parse(12) ).toBeUndefined();
            expect( HttpStatusCode.parse(-12) ).toBeUndefined();
            expect( HttpStatusCode.parse(123.99999) ).toBeUndefined();
            expect( HttpStatusCode.parse(-123.99999) ).toBeUndefined();
            expect( HttpStatusCode.parse("hello") ).toBeUndefined();
            expect( HttpStatusCode.parse("") ).toBeUndefined();
            expect( HttpStatusCode.parse([]) ).toBeUndefined();
            expect( HttpStatusCode.parse([123]) ).toBeUndefined();
            expect( HttpStatusCode.parse(["123"]) ).toBeUndefined();
            expect( HttpStatusCode.parse(["Hello world", "foo"]) ).toBeUndefined();
            expect( HttpStatusCode.parse({}) ).toBeUndefined();
            expect( HttpStatusCode.parse({"foo":"bar"}) ).toBeUndefined();
            expect( HttpStatusCode.parse({"foo":1234}) ).toBeUndefined();

        });

    });

});

describe('parseHttpStatusCodeString', () => {

    test( 'can parse status string ranges with various separators', () => {

        expect( parseHttpStatusCodeString("200-299", '-') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200 299", ' ') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200..299", '..') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200...299", '...') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200,299", ',') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200#299", '#') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200&299", '&') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200;299", ';') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200+299", '+') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200|299", '|') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200/299", '/') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200<299", '<') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200>299", '>') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200\t299", '\t') ).toStrictEqual([200,299]);
        expect( parseHttpStatusCodeString("200\n299", '\n') ).toStrictEqual([200,299]);

    });

});
