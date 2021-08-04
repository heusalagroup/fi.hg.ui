// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { createOr, filter, TestCallback } from "../../ts/modules/lodash";

export namespace TestUtils {

    /**
     * Create array of invalid values
     *
     * @param skipValues Skips values in this array
     * @param skipTests
     */
    export function createInvalidValues (
        skipValues: any[] = [],
        skipTests: TestCallback[] = []
    ) : any[] {

        const skipTest = skipTests.length >= 1 ? createOr(...skipTests) : undefined;

        return filter([
            undefined,
            null,
            false,
            true,
            NaN,
            () => {},
            0,
            Symbol(),
            1628078651664,
            new Date('2021-08-04T12:04:00.844Z'),
            1,
            12,
            -12,
            123,
            123.99999,
            -123.99999,
            "123",
            "hello",
            "",
            [],
            [123],
            ["123"],
            ["Hello world", "foo"],
            {},
            {"foo":"bar"},
            {"foo":1234},
        ], (item : any) : boolean => {

            if (skipValues.indexOf(item) >= 0) {
                return false;
            }

            if (skipTest && skipTest(item)) {
                return false;
            }

            return true;

        });
    }

}
