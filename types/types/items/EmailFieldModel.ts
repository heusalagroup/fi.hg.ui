// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel from "../FormFieldModel";

export interface EmailFieldModel extends FormFieldModel {

    type         : FormItemType.EMAIL_FIELD;

}

export function isEmailFieldModel (value: any) : value is EmailFieldModel {
    return value?.type === FormItemType.EMAIL_FIELD;
}

export default EmailFieldModel;
