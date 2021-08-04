// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {filter} from "../../ts/modules/lodash";

export namespace TestUtils {

    /**
     * Create array of invalid values
     *
     * @param skipValues Skips values in this array
     */
    export function createInvalidValues (
        skipValues: any[] = []
    ) : any[] {
        return filter([
            undefined,
            null,
            false,
            true,
            NaN,
            () => {},
            0,
            Symbol(),
            1628078651664, // Date.now()
            new Date('2021-08-04T12:04:00.844Z'), // new Date()
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
            {"foo":1234}
        ], (item : any) : boolean => skipValues.indexOf(item) >= 0);
    }

}
