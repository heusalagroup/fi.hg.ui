// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import {isString} from "../../../ts/modules/lodash";
import FormItemModel from "../FormItemModel";

export interface PageBreakModel extends FormItemModel {

    type        : FormItemType.PAGE_BREAK;
    backLabel  ?: string;
    nextLabel  ?: string;

}

export function isPageBreakModel (value: any) : value is PageBreakModel {
    return (
        !!value
        && value?.type === FormItemType.PAGE_BREAK
        && isString(value?.backLabel ?? '')
        && isString(value?.nextLabel ?? '')
    );
}

export default PageBreakModel;
