import FormItemType, {isFormItemType} from "./FormItemType";

export interface FormItemModel {

    readonly type : FormItemType;

}

export function isFormItemModel (value: any) : value is FormItemModel {
    return (
        !!value && isFormItemType(value?.type)
    );
}

export function stringifyFormItemModel (value: FormItemModel): string {
    if ( !isFormItemModel(value) ) throw new TypeError(`Not FormItemModel: ${value}`);
    return `FormItemModel(${value})`;
}

export function parseFormItemModel (value: any): FormItemModel | undefined {
    if ( isFormItemModel(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace FormItemModel {

    export function test (value: any): value is FormItemModel {
        return isFormItemModel(value);
    }

    export function stringify (value: FormItemModel): string {
        return stringifyFormItemModel(value);
    }

    export function parse (value: any): FormItemModel | undefined {
        return parseFormItemModel(value);
    }

}

export default FormItemModel;
