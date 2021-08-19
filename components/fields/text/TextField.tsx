// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './TextField.scss';
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import TextFieldModel from "../../../types/items/TextFieldModel";
import FieldProps from '../FieldProps';

export interface TextFieldState {

    value: string;

}

export interface TextFieldProps extends FieldProps<TextFieldModel, string> {

}

export interface OnChangeCallback<T> {
    (event: React.ChangeEvent<T>) : void;
}

export class TextField extends React.Component<TextFieldProps, TextFieldState> {

    private readonly _handleChangeCallback : OnChangeCallback<HTMLInputElement>;

    constructor(props: TextFieldProps) {

        super(props);

        this.state = {
            value: props.value ?? ''
        };

        this._handleChangeCallback = this._onChange.bind(this);

    }

    componentDidMount() {
        this._updateValueState();
    }

    componentDidUpdate(prevProps: Readonly<TextFieldProps>, prevState: Readonly<TextFieldState>, snapshot?: any) {
        if (prevProps.value !== this.props.value) {
            this._updateValueState();
        }
    }

    render () {

        const label       = this.props.label       ?? this.props.model?.label;
        const placeholder = this.props.placeholder ?? this.props.model?.placeholder;

        return (
            <label className={
                UserInterfaceClassName.TEXT_FIELD + ' ' + UserInterfaceClassName.FIELD
                + ' ' + (this.props.className ?? '')
            }>
                {label ? (
                    <span className={UserInterfaceClassName.TEXT_FIELD+'-label'}>{label}</span>
                ) : null}
                <input
                    className={UserInterfaceClassName.TEXT_FIELD+'-input'}
                    type="text"
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

export default TextField;
