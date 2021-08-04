// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import FormFieldModel from "../FormFieldModel";

export interface PasswordFieldModel extends FormFieldModel {

    type         : FormItemType.PASSWORD_FIELD;

}

export function isPasswordFieldModel (value: any) : value is PasswordFieldModel {
    return value?.type === FormItemType.PASSWORD_FIELD;
}

export default PasswordFieldModel;
