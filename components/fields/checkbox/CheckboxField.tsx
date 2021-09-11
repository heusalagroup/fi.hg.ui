// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './CheckboxField.scss';
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import CheckboxFieldModel from "../../../types/items/CheckboxFieldModel";
import FieldProps from '../FieldProps';
import LogService from "../../../../ts/LogService";

const LOG = LogService.createLogger('CheckboxField');

export interface CheckboxFieldState {

}

export interface CheckboxFieldProps extends FieldProps<CheckboxFieldModel, boolean> {

}

export interface OnChangeCallback<T> {
    (event: React.ChangeEvent<T>) : void;
}

export class CheckboxField extends React.Component<CheckboxFieldProps, CheckboxFieldState> {

    private readonly _handleChangeCallback : OnChangeCallback<HTMLInputElement>;
    private readonly _inputRef             : React.RefObject<HTMLInputElement>;


    public constructor(props: CheckboxFieldProps) {

        super(props);

        this.state = {};

        this._handleChangeCallback = this._onChange.bind(this);
        this._inputRef = React.createRef();

    }

    public componentDidMount() {
    }

    public componentDidUpdate(prevProps: Readonly<CheckboxFieldProps>, prevState: Readonly<CheckboxFieldState>, snapshot?: any) {
        LOG.debug('Update: ', prevProps, this.props);
    }

    public render () {

        const label = this.props.label ?? this.props.model?.label;

        return (
            <label className={UserInterfaceClassName.CHECKBOX_FIELD + ' ' + UserInterfaceClassName.FIELD}>
                <input
                    ref={this._inputRef}
                    className={UserInterfaceClassName.CHECKBOX_FIELD+'-input'}
                    type="checkbox"
                    autoComplete="off"
                    onChange={this._handleChangeCallback}
                />
                {label ? (
                    <span className={UserInterfaceClassName.CHECKBOX_FIELD+'-label'}>{label}</span>
                ) : null}
                {this.props.children}
            </label>
        );

    }


    private _getValue () : boolean {

        if (!this._inputRef) return false;

        const el : HTMLInputElement | null = this._inputRef.current;

        return el ? el.checked : false;
    }

    private _onChange (event: React.ChangeEvent<HTMLInputElement>) {

        // if (event) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        const value = this._getValue();

        LOG.debug('_onChange: value = ', value);

        if (this.props.change) {
            try {
                this.props.change(value);
            } catch (err) {
                LOG.error('Error in change props: ', err);
            }
        } else {
            LOG.warn('No change props defined!');
        }

    }

}

export default CheckboxField;
