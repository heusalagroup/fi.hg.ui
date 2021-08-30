// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './TextAreaField.scss';
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import TextAreaFieldModel from "../../../types/items/TextAreaFieldModel";
import FieldProps from '../FieldProps';

export interface TextAreaFieldState {

    value: string;

}

export interface TextAreaFieldProps extends FieldProps<TextAreaFieldModel, string> {

}

export interface OnChangeCallback<T> {
    (event: React.ChangeEvent<T>) : void;
}

export class TextAreaField extends React.Component<TextAreaFieldProps, TextAreaFieldState> {

    private readonly _handleChangeCallback : OnChangeCallback<HTMLTextAreaElement>;

    constructor(props: TextAreaFieldProps) {

        super(props);

        this.state = {
            value: props.value ?? ''
        };

        this._handleChangeCallback = this._onChange.bind(this);

    }

    componentDidMount() {
        this._updateValueState();
    }

    componentDidUpdate(prevProps: Readonly<TextAreaFieldProps>, prevState: Readonly<TextAreaFieldState>, snapshot?: any) {
        if (prevProps.value !== this.props.value) {
            this._updateValueState();
        }
    }

    render () {

        const label       = this.props.label       ?? this.props.model?.label;
        const placeholder = this.props.placeholder ?? this.props.model?.placeholder;
        const isReadOnly    = !this.props?.change;

        return (
            <label className={UserInterfaceClassName.TEXT_AREA_FIELD + ' ' + UserInterfaceClassName.FIELD}>
                {label ? (
                    <span className={UserInterfaceClassName.TEXT_AREA_FIELD+'-label'}>{label}</span>
                ) : null}
                <textarea
                    className={UserInterfaceClassName.TEXT_AREA_FIELD+'-input'}
                    autoComplete="off"
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={this._handleChangeCallback}
                    readOnly={isReadOnly}
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

    private _onChange (event: React.ChangeEvent<HTMLTextAreaElement>) {

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

export default TextAreaField;
