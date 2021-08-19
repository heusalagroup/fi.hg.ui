// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isRegularObject,
    isString
} from "../../ts/modules/lodash";

export interface LoginDTO {
    readonly username: string;
    readonly password: string;
}

export function isLoginDTO (value: any) : value is LoginDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, ['username', 'password'])
        && isString(value?.username)
        && isString(value?.password)
    );
}

export default LoginDTO;
