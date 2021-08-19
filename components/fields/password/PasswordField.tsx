// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './PasswordField.scss';
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import PasswordFieldModel from "../../../types/items/PasswordFieldModel";
import FieldProps from '../FieldProps';

export interface PasswordFieldState {
    value: string;
}

export interface PasswordFieldProps extends FieldProps<PasswordFieldModel, string> {

}

export interface OnChangeCallback<T> {
    (event: React.ChangeEvent<T>) : void;
}

export class PasswordField extends React.Component<PasswordFieldProps, PasswordFieldState> {

    private readonly _handleChangeCallback : OnChangeCallback<HTMLInputElement>;

    constructor(props: PasswordFieldProps) {

        super(props);

        this.state = {
            value: props.value ?? ''
        };

        this._handleChangeCallback = this._onChange.bind(this);

    }

    componentDidMount() {
        this._updateValueState();
    }

    componentDidUpdate(prevProps: Readonly<PasswordFieldProps>, prevState: Readonly<PasswordFieldState>, snapshot?: any) {
        if (prevProps.value !== this.props.value) {
            this._updateValueState();
        }
    }

    render () {

        const label       = this.props.label       ?? this.props.model?.label;
        const placeholder = this.props.placeholder ?? this.props.model?.placeholder;

        return (
            <label className={
                UserInterfaceClassName.PASSWORD_FIELD + ' ' + UserInterfaceClassName.FIELD
                + ' ' + (this.props.className ?? '')
            }>
                {label ? (
                    <span className={UserInterfaceClassName.PASSWORD_FIELD+'-label'}>{label}</span>
                ) : null}
                <input
                    className={UserInterfaceClassName.PASSWORD_FIELD+'-input'}
                    type="password"
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

export default PasswordField;
