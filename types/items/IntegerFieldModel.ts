// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel, { isFormFieldModel } from "../FormFieldModel";

export interface IntegerFieldModel extends FormFieldModel {

    type         : FormItemType.INTEGER_FIELD;

}

export function isIntegerFieldModel (value: any) : value is IntegerFieldModel {
    return value?.type === FormItemType.INTEGER_FIELD && isFormFieldModel(value);
}

export function stringifyIntegerFieldModel (value: IntegerFieldModel): string {
    return `IntegerFieldModel(${value})`;
}

export function parseIntegerFieldModel (value: any): IntegerFieldModel | undefined {
    if ( isIntegerFieldModel(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace IntegerFieldModel {

    export function test (value: any): value is IntegerFieldModel {
        return isIntegerFieldModel(value);
    }

    export function stringify (value: IntegerFieldModel): string {
        return stringifyIntegerFieldModel(value);
    }

    export function parse (value: any): IntegerFieldModel | undefined {
        return parseIntegerFieldModel(value);
    }

}

export default IntegerFieldModel;
