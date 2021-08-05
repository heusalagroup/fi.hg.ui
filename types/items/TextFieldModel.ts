// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel, { isFormFieldModel } from "../FormFieldModel";

export interface TextFieldModel extends FormFieldModel {

    type         : FormItemType.TEXT_FIELD;

}

export function isTextFieldModel (value: any) : value is TextFieldModel {
    return value?.type === FormItemType.TEXT_FIELD && isFormFieldModel(value);
}

export function stringifyTextFieldModel (value: TextFieldModel): string {
    if ( !isTextFieldModel(value) ) throw new TypeError(`Not TextFieldModel: ${value}`);
    return `TextFieldModel(${value})`;
}

export function parseTextFieldModel (value: any): TextFieldModel | undefined {
    if ( isTextFieldModel(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace TextFieldModel {

    export function test (value: any): value is TextFieldModel {
        return isTextFieldModel(value);
    }

    export function stringify (value: TextFieldModel): string {
        return stringifyTextFieldModel(value);
    }

    export function parse (value: any): TextFieldModel | undefined {
        return parseTextFieldModel(value);
    }

}

export default TextFieldModel;
