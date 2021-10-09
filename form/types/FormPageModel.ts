// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormFieldModel from "../../components/types/FormFieldModel";

export interface FormPageModel {

    title       ?: string;
    cancelLabel ?: string;
    submitLabel ?: string;
    items        : FormFieldModel[];

}

export function isFormPageModel (value: any): value is FormPageModel {
    return (
        !!value
        // FIXME: TODO
        //&& isString(value?.foo)
    );
}

export function stringifyFormPageModel (value: FormPageModel): string {
    if ( !isFormPageModel(value) ) throw new TypeError(`Not FormPageModel: ${value}`);
    return `FormPageModel(${value})`;
}

export function parseFormPageModel (value: any): FormPageModel | undefined {
    if ( isFormPageModel(value) ) return value;
    return undefined;
}

export default FormPageModel;
