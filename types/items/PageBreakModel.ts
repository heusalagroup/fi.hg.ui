// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import FormItemType from "../FormItemType";
import { isStringOrUndefined } from "../../../ts/modules/lodash";
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
        && isStringOrUndefined(value?.backLabel)
        && isStringOrUndefined(value?.nextLabel)
    );
}

export function stringifyPageBreakModel (value: PageBreakModel): string {
    if ( !isPageBreakModel(value) ) throw new TypeError(`Not PageBreakModel: ${value}`);
    return `PageBreakModel(${value})`;
}

export function parsePageBreakModel (value: any): PageBreakModel | undefined {
    if ( isPageBreakModel(value) ) return value;
    return undefined;
}

// eslint-disable-next-line
export namespace PageBreakModel {

    export function test (value: any): value is PageBreakModel {
        return isPageBreakModel(value);
    }

    export function stringify (value: PageBreakModel): string {
        return stringifyPageBreakModel(value);
    }

    export function parse (value: any): PageBreakModel | undefined {
        return parsePageBreakModel(value);
    }

}

export default PageBreakModel;
