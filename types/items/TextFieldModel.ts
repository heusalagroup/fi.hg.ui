// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel from "../FormFieldModel";

export interface TextFieldModel extends FormFieldModel {

    type         : FormItemType.TEXT_FIELD;

}

export function isTextFieldModel (value: any) : value is TextFieldModel {
    return value?.type === FormItemType.TEXT_FIELD;
}

export default TextFieldModel;
