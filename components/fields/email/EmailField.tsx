// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './EmailField.scss';
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import EmailFieldModel from "../../../types/items/EmailFieldModel";
import FieldProps from '../FieldProps';

export interface EmailFieldState {

    value: string;

}

export interface EmailFieldProps extends FieldProps<EmailFieldModel, string> {

}

export interface OnChangeCallback<T> {
    (event: React.ChangeEvent<T>) : void;
}

export class EmailField extends React.Component<EmailFieldProps, EmailFieldState> {

    private readonly _handleChangeCallback : OnChangeCallback<HTMLInputElement>;

    constructor(props: EmailFieldProps) {

        super(props);

        this.state = {
            value: props.value ?? ''
        };

        this._handleChangeCallback = this._onChange.bind(this);

    }

    componentDidMount() {
        this._updateValueState();
    }

    componentDidUpdate(prevProps: Readonly<EmailFieldProps>, prevState: Readonly<EmailFieldState>, snapshot?: any) {
        if (prevProps.value !== this.props.value) {
            this._updateValueState();
        }
    }

    render () {

        const label       = this.props.label       ?? this.props.model?.label;
        const placeholder = this.props.placeholder ?? this.props.model?.placeholder;

        return (
            <label className={
                UserInterfaceClassName.EMAIL_FIELD + ' ' + UserInterfaceClassName.FIELD
                + ' ' + (this.props.className ?? '')
            }>
                {label ? (
                    <span className={UserInterfaceClassName.EMAIL_FIELD+'-label'}>{label}</span>
                ) : null}
                <input
                    className={UserInterfaceClassName.EMAIL_FIELD+'-input'}
                    type="email"
                    autoComplete="off"
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={this._handleChangeCallback}
                />
                {this.props.children}
            </label>
        );

    }

    private _updateValueState () {

        const value : string = this.props?.value ?? '';

        this._setStateValue(value);

    }

    private _setStateValue (value: string) {

        if (value !== this.state.value) {
            this.setState({value});
        }

    }

    private _onChange (event: React.ChangeEvent<HTMLInputElement>) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const value = event?.target?.value ?? '';

        this._setStateValue(value);

        if (this.props.change) {
            try {
                this.props.change(value);
            } catch (err) {
                console.error('Error: ', err);
            }
        }

    }

}

export default EmailField;
