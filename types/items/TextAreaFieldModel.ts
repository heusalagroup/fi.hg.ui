// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel from "../FormFieldModel";

export interface TextAreaFieldModel extends FormFieldModel {

    type         : FormItemType.TEXT_AREA_FIELD;

}

export function isTextAreaFieldModel (value: any) : value is TextAreaFieldModel {
    return value?.type === FormItemType.TEXT_AREA_FIELD;
}

export default TextAreaFieldModel;
