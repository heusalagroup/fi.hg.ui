// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormSubmitCallback from "./FormSubmitCallback";
import JsonHttpAction from "./JsonHttpAction";

/**
 * If the value is a string, it will be treated as JsonHttpAction with the string as the URL param.
 */
export type FormControllerAction = FormSubmitCallback | JsonHttpAction | string;

export default FormControllerAction;
