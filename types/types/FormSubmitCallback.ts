// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {FormValue} from "./FormValue";

export interface FormSubmitCallback {
    (value: FormValue): void;
}

export default FormSubmitCallback;
