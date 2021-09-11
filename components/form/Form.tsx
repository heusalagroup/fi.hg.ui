// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './Form.scss';
import UserInterfaceClassName from "../../constants/UserInterfaceClassName";
import FormModel from "../../types/FormModel";
import FormFieldModel from "../../types/FormFieldModel";
import map from 'lodash/map';
import Button, {ButtonClickCallback, ButtonType} from "../button/Button";
import FormUtils from "../fields/FormUtils";
import {FieldChangeCallback} from "../fields/FieldProps";
import {get, set} from "../../../ts/modules/lodash";
import LogService from "../../../ts/LogService";
import FormItem from "../../types/FormItem";
import PageBreakModel from "../../types/items/PageBreakModel";
import {VoidCallback} from "../../interfaces/callbacks";

const LOG = LogService.createLogger('Form');

export interface FormState {

    page : number;

}

export interface FormProps<ValueT> {

    className ?: string;

    model   : FormModel;
    value   : ValueT;
    change ?: FieldChangeCallback<ValueT>;

    cancel ?: VoidCallback;
    submit ?: VoidCallback;

}

export class Form extends React.Component<FormProps<any>, FormState> {

    private readonly _cancelCallback    : ButtonClickCallback;
    private readonly _submitCallback    : ButtonClickCallback;
    private readonly _backPageCallback  : ButtonClickCallback;
    private readonly _nextPageCallback  : ButtonClickCallback;

    public constructor(props: FormProps<any>) {

        super(props);

        this.state = {
            page: 0
        };

        this._cancelCallback   = this._onCancelButton.bind(this);
        this._submitCallback   = this._onSubmitButton.bind(this);
        this._nextPageCallback = this._onNextButton.bind(this);
        this._backPageCallback = this._onBackButton.bind(this);

    }

    public render () {

        const pageNumber : number                     = this.state.page;
        const spec       : FormModel                  = this.props.model;
        const mainTitle  : string = spec.title;
        const allItems   : FormItem[]                 = spec.items;

        const pageCount = FormUtils.getPageCount(allItems);

        if (pageNumber >= pageCount) {
            LOG.warn(`Warning! Page ${pageNumber} is invalid: We only had ${pageCount} pages`);
            return null;
        }

        const pageItems     : FormItem[] = pageCount === 1 ? allItems : FormUtils.getPageItems(pageNumber, allItems);
        const pageBreak     : PageBreakModel | undefined = pageCount === 1 ? undefined : FormUtils.getPageBreak(pageNumber, allItems);
        const prevPageBreak : PageBreakModel | undefined = pageCount === 1 || pageNumber <= 0 ? undefined : FormUtils.getPageBreak(pageNumber - 1, allItems);

        const isFirstPage : boolean = pageNumber === 0;
        const isLastPage  : boolean = pageNumber === pageCount - 1;

        const cancelCallback          = isFirstPage ? this._cancelCallback            : this._backPageCallback;
        const cancelLabel   : string  = isFirstPage ? (spec?.cancelLabel ?? 'Cancel') : (prevPageBreak?.backLabel ?? 'Back');
        const hasCancelProp : boolean = isFirstPage ? !!this.props.cancel             : true;

        const submitCallback          = isLastPage  ? this._submitCallback            : this._nextPageCallback;
        const submitLabel   : string  = isLastPage  ? (spec?.submitLabel ?? 'Submit') : (pageBreak?.nextLabel ?? 'Next page');
        const hasSubmitProp : boolean = isLastPage  ? !!this.props.submit             : true;

        return (
            <div className={UserInterfaceClassName.FORM}>

                <header className={UserInterfaceClassName.FORM + '-header'}>
                    <h2>{mainTitle}</h2>
                </header>

                <section className={UserInterfaceClassName.FORM + '-content'}>

                    {map(pageItems, (item : FormFieldModel) => {

                        const globalIndex : number = allItems.indexOf(item);
                        const itemKey     : string = item?.key ?? `${globalIndex}`;
                        const Component   : any    = FormUtils.getComponentForModel(item);

                        if (Component) {
                            const valueModel : any = this.props.value;
                            const componentValue = get(valueModel, itemKey, undefined);

                            return (
                                <Component
                                    key={`form-item-${globalIndex}`}
                                    model={item}
                                    value={componentValue}
                                    change={(value: any) => this._setItemValue(itemKey, value)}
                                />
                            );
                        }

                        return (
                            <div
                                key={`form-item-${globalIndex}`}
                            />
                        );

                    })}

                </section>

                <footer className={UserInterfaceClassName.FORM + '-footer'}>

                    {hasCancelProp ? (
                        <Button click={cancelCallback}>{cancelLabel}</Button>
                    ) : null}

                    {hasSubmitProp ? (
                        <Button type={ButtonType.SUBMIT} click={submitCallback}>{submitLabel}</Button>
                    ) : null}

                </footer>

            </div>
        );

    }

    private _onCancelButton () {

        try {
            if (this.props.cancel) {
                this.props.cancel();
            } else {
                LOG.warn('No cancel prop defined!');
            }
        } catch(err) {
            LOG.error('Error while executing cancel prop: ' + err);
        }

    }

    private _onSubmitButton () {

        try {
            if (this.props.submit) {
                this.props.submit();
            } else {
                LOG.warn('No submit prop defined!');
            }
        } catch(err) {
            LOG.error('Error while executing submit prop: ' + err);
        }

    }

    private _onNextButton () {

        this.setState((state : FormState) => {

            const pageCount = FormUtils.getPageCount(this.props.model.items);
            const nextPage  = state.page + 1;

            if (nextPage < pageCount) {
                return {page: nextPage};
            } else {
                return {page: state.page};
            }

        });

    }

    private _onBackButton () {
        this.setState((state : FormState) => ({page: state.page - 1 >= 0 ? state.page - 1 : 0 }));
    }

    private _changeFormValue (newValue: any) {
        try {
            if (this.props.change) {
                this.props.change(newValue);
            } else {
                LOG.warn('No change prop defined!');
            }
        } catch(err) {
            LOG.error('Error while executing change prop: ' + err);
        }
    }

    private _setItemValue (key: string, newValue: any) {

        LOG.debug('_setItemValue: ', key, newValue);

        const valueModel : any = this.props.value;
        const prevValue = get(valueModel, key, undefined);

        LOG.debug('_setItemValue: valueModel = ', valueModel);
        LOG.debug('_setItemValue: prevValue = ', prevValue);

        if (prevValue !== newValue) {
            const newModel = {
                ...valueModel
            };
            set(newModel, key, newValue);
            return this._changeFormValue(newModel);
        } else {
            LOG.debug('The form value did not change: ', key, newValue, prevValue, valueModel);
        }

    }

}

export default Form;
