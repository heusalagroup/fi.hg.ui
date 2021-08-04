import FormFieldModel from "./FormFieldModel";

export interface FormPageModel {

    title       ?: string;
    cancelLabel ?: string;
    submitLabel ?: string;
    items        : FormFieldModel[];

}

export default FormPageModel;
