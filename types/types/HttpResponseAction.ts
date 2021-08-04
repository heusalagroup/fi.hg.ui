// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import HttpStatusCodeMatcher from "./HttpStatusCodeMatcher";
import FormControllerAction from "./FormControllerAction";

export type HttpResponseAction = HttpStatusCodeMatcher<FormControllerAction> | FormControllerAction;

export default HttpResponseAction;
