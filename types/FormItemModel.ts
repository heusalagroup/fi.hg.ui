import FormItemType, {isFormItemType} from "./FormItemType";

export interface FormItemModel {

    type : FormItemType;

}

export function isFormItemModel (value: any) : value is FormItemModel {
    return (
        !!value && isFormItemType(value?.type)
    );
}

export default FormItemModel;
