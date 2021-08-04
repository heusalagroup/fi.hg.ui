// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel, { isFormFieldModel } from "../FormFieldModel";

export interface TextAreaFieldModel extends FormFieldModel {

    type         : FormItemType.TEXT_AREA_FIELD;

}

export function isTextAreaFieldModel (value: any) : value is TextAreaFieldModel {
    return value?.type === FormItemType.TEXT_AREA_FIELD && isFormFieldModel(value);
}

export function stringifyTextAreaFieldModel (value: TextAreaFieldModel): string {
    return `TextAreaFieldModel(${value})`;
}

export function parseTextAreaFieldModel (value: any): TextAreaFieldModel | undefined {
    if ( isTextAreaFieldModel(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace TextAreaFieldModel {

    export function test (value: any): value is TextAreaFieldModel {
        return isTextAreaFieldModel(value);
    }

    export function stringify (value: TextAreaFieldModel): string {
        return stringifyTextAreaFieldModel(value);
    }

    export function parse (value: any): TextAreaFieldModel | undefined {
        return parseTextAreaFieldModel(value);
    }

}

export default TextAreaFieldModel;
