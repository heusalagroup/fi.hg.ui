// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './IntegerField.scss';
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import IntegerFieldModel from "../../../types/items/IntegerFieldModel";
import FieldProps from '../FieldProps';
import LogService from "../../../../ts/LogService";
import {trim} from "../../../../ts/modules/lodash";

const DEFAULT_PLACEHOLDER = '123';

const LOG = LogService.createLogger('IntegerField');

export interface IntegerFieldState {

    value: string;

}

export interface IntegerFieldProps extends FieldProps<IntegerFieldModel, number> {

}

export interface OnChangeCallback<T> {
    (event: React.ChangeEvent<T>) : void;
}

export class IntegerField extends React.Component<IntegerFieldProps, IntegerFieldState> {

    private readonly _handleChangeCallback : OnChangeCallback<HTMLInputElement>;

    constructor(props: IntegerFieldProps) {

        super(props);

        this.state = {
            value: IntegerField.stringifyValue(props.value)
        };

        this._handleChangeCallback = this._onChange.bind(this);

    }

    componentDidMount() {
        this._updateValueState();
    }

    componentDidUpdate(prevProps: Readonly<IntegerFieldProps>, prevState: Readonly<IntegerFieldState>, snapshot?: any) {
        if (prevProps.value !== this.props.value) {
            this._updateValueState();
        }
    }

    private _updateValueState () {

        const value : string = IntegerField.stringifyValue(this.props?.value);

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
                this.props.change(IntegerField.toInteger(value));
            } catch (err) {
                console.error('Error: ', err);
            }
        }

    }

    render () {

        const label       = this.props.label       ?? this.props.model?.label;
        const placeholder = this.props.placeholder ?? this.props.model?.placeholder ?? DEFAULT_PLACEHOLDER;

        return (
            <label className={UserInterfaceClassName.INTEGER_FIELD + ' ' + UserInterfaceClassName.FIELD}>
                {label ? (
                    <span className={UserInterfaceClassName.INTEGER_FIELD+'-label'}>{label}</span>
                ) : null}
                <input
                    className={UserInterfaceClassName.INTEGER_FIELD+'-input'}
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

    static toInteger (value : string) : number | undefined {
        try {
            value = trim(value);
            if (value === '') return undefined;
            return parseInt(value, 10);
        } catch (err) {
            LOG.warn(`Error while parsing string as integer "${value}": `, err);
            return undefined;
        }
    }

    static stringifyValue (value: number | undefined) : string {
        return `${value ?? ''}`;
    }

}

export default IntegerField;
