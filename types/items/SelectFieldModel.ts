// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel from "../FormFieldModel";
import {isArray} from "../../../ts/modules/lodash";

export interface SelectFieldItem<T> {

    readonly label : string;
    readonly value : T;

}

export interface SelectFieldModel<T> extends FormFieldModel {

    readonly type   : FormItemType.SELECT_FIELD;
    readonly values : SelectFieldItem<T>[];

}

export function isSelectFieldModel (value: any) : value is SelectFieldModel<any> {
    return (
        value?.type === FormItemType.SELECT_FIELD
        && isArray(value?.values)
    );
}

export default SelectFieldModel;
