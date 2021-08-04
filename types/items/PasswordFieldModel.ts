// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel, { isFormFieldModel } from "../FormFieldModel";

export interface PasswordFieldModel extends FormFieldModel {

    type         : FormItemType.PASSWORD_FIELD;

}

export function isPasswordFieldModel (value: any) : value is PasswordFieldModel {
    return value?.type === FormItemType.PASSWORD_FIELD && isFormFieldModel(value);
}

export function stringifyPasswordFieldModel (value: PasswordFieldModel): string {
    return `PasswordFieldModel(${value})`;
}

export function parsePasswordFieldModel (value: any): PasswordFieldModel | undefined {
    if ( isPasswordFieldModel(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace PasswordFieldModel {

    export function test (value: any): value is PasswordFieldModel {
        return isPasswordFieldModel(value);
    }

    export function stringify (value: PasswordFieldModel): string {
        return stringifyPasswordFieldModel(value);
    }

    export function parse (value: any): PasswordFieldModel | undefined {
        return parsePasswordFieldModel(value);
    }

}

export default PasswordFieldModel;
