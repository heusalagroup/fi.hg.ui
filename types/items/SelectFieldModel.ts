// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel, { isFormFieldModel } from "../FormFieldModel";
import { isArray, TestCallback } from "../../../ts/modules/lodash";

export interface SelectFieldItem<T> {

    readonly label : string;
    readonly value : T;

}

export interface SelectFieldModel<T> extends FormFieldModel {

    readonly type   : FormItemType.SELECT_FIELD;
    readonly values : SelectFieldItem<T>[];

}

export function isSelectFieldModel<T = any> (
    value  : any,
    isItem : TestCallback | undefined = undefined
) : value is SelectFieldModel<T> {
    return (
        value?.type === FormItemType.SELECT_FIELD
        && isArray<T>(value?.values, isItem)
        && isFormFieldModel(value)
    );
}

export function stringifySelectFieldModel<T = any> (value: SelectFieldModel<T>): string {
    return `SelectFieldModel(${value})`;
}

/**
 *
 * @param value
 * @fixme No support to parse value items
 */
export function parseSelectFieldModel<T = any> (value: any): SelectFieldModel<T> | undefined {
    if ( isSelectFieldModel<T>(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace SelectFieldModel {

    export function test<T = any> (
        value: any,
        isItem : TestCallback | undefined = undefined
    ): value is SelectFieldModel<T> {
        return isSelectFieldModel(value, isItem);
    }

    export function stringify<T = any> (value: SelectFieldModel<T>): string {
        return stringifySelectFieldModel<T>(value);
    }

    export function parse<T = any> (value: any): SelectFieldModel<T> | undefined {
        return parseSelectFieldModel<T>(value);
    }

}

export default SelectFieldModel;
