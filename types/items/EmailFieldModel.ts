// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel, { isFormFieldModel } from "../FormFieldModel";

export interface EmailFieldModel extends FormFieldModel {

    type         : FormItemType.EMAIL_FIELD;

}

export function isEmailFieldModel (value: any) : value is EmailFieldModel {
    return value?.type === FormItemType.EMAIL_FIELD && isFormFieldModel(value);
}

export function stringifyEmailFieldModel (value: EmailFieldModel): string {
    if ( !isEmailFieldModel(value) ) throw new TypeError(`Not EmailFieldModel: ${value}`);
    return `EmailFieldModel(${value})`;
}

export function parseEmailFieldModel (value: any): EmailFieldModel | undefined {
    if ( isEmailFieldModel(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace EmailFieldModel {

    export function test (value: any): value is EmailFieldModel {
        return isEmailFieldModel(value);
    }

    export function stringify (value: EmailFieldModel): string {
        return stringifyEmailFieldModel(value);
    }

    export function parse (value: any): EmailFieldModel | undefined {
        return parseEmailFieldModel(value);
    }

}

export default EmailFieldModel;
