// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {FormControllerAction} from "./FormControllerAction";
import FormValue from "./FormValue";
import FormModel from "./FormModel";

export interface FormController {

    readonly model    : FormModel;
    readonly value    ?: FormValue;
    readonly onSubmit ?: FormControllerAction;
    readonly onCancel ?: FormControllerAction;

}

export function isFormController (value: any) : value is FormController {



}

export namespace FormController {

    export function test (value: any) : value is FormController {
        return isFormController(value);
    }

}

export default FormController;
