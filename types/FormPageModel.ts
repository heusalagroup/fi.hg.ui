import FormFieldModel from "./FormFieldModel";

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

// eslint-disable-next-line
export namespace FormPageModel {

    export function test (value: any): value is FormPageModel {
        return isFormPageModel(value);
    }

    export function stringify (value: FormPageModel): string {
        return stringifyFormPageModel(value);
    }

    export function parse (value: any): FormPageModel | undefined {
        return parseFormPageModel(value);
    }

}

export default FormPageModel;
