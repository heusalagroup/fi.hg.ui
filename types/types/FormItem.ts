import FormFieldModel, {isFormFieldModel} from "./FormFieldModel";
import PageBreakModel, {isPageBreakModel} from "./items/PageBreakModel";

export type FormItem = FormFieldModel | PageBreakModel;

export function isFormItem (value: any) : value is FormItem {
    return (
        isFormFieldModel(value)
        || isPageBreakModel(value)
    );
}

export default FormItem;
