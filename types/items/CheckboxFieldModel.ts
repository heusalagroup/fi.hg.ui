// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel from "../FormFieldModel";

export interface CheckboxFieldModel extends FormFieldModel {

    type         : FormItemType.CHECKBOX_FIELD;

}

export function isCheckboxFieldModel (value: any) : value is CheckboxFieldModel {
    return value?.type === FormItemType.CHECKBOX_FIELD;
}

export default CheckboxFieldModel;
