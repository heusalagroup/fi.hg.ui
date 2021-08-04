// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel from "../FormFieldModel";

export interface IntegerFieldModel extends FormFieldModel {

    type         : FormItemType.INTEGER_FIELD;

}

export function isIntegerFieldModel (value: any) : value is IntegerFieldModel {
    return value?.type === FormItemType.INTEGER_FIELD;
}

export default IntegerFieldModel;
