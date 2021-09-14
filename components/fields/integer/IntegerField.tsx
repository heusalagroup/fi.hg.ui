// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './IntegerField.scss';
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import IntegerFieldModel from "../../../types/items/IntegerFieldModel";
import FieldProps from '../FieldProps';
import LogService from "../../../../ts/LogService";
import { isSafeInteger, trim } from "../../../../ts/modules/lodash";
import FormFieldState, { stringifyFormFieldState } from "../../../types/FormFieldState";

const DEFAULT_PLACEHOLDER = '123';

const LOG = LogService.createLogger('IntegerField');

export interface IntegerFieldState {

    readonly fieldState : FormFieldState;
    readonly value      : string;

}

export interface IntegerFieldProps extends FieldProps<IntegerFieldModel, number> {

}

export interface OnChangeCallback<T> {
    (event: React.ChangeEvent<T>) : void;
}

export class IntegerField extends React.Component<IntegerFieldProps, IntegerFieldState> {

    private readonly _handleChangeCallback : OnChangeCallback<HTMLInputElement>;

    private _fieldState : FormFieldState;


    public constructor(props: IntegerFieldProps) {

        super(props);

        this._fieldState = FormFieldState.CONSTRUCTED;

        this.state = {
            value      : IntegerField.stringifyValue(props.value),
            fieldState : this._fieldState
        };

        this._handleChangeCallback = this._onChange.bind(this);

    }

    public componentDidMount() {

        this._updateValueState();
        this._setFieldState(FormFieldState.MOUNTED);
        this._updateFieldState();

    }

    public componentDidUpdate(prevProps: Readonly<IntegerFieldProps>, prevState: Readonly<IntegerFieldState>, snapshot?: any) {

        if (prevProps.value !== this.props.value) {
            this._updateValueState();
            this._updateFieldState();
        } else if (prevProps.model !== this.props.model) {
            this._updateFieldState();
        }

    }

    public render () {

        const label       = this.props.label       ?? this.props.model?.label;
        const placeholder = this.props.placeholder ?? this.props.model?.placeholder ?? DEFAULT_PLACEHOLDER;
        const fieldState  = stringifyFormFieldState( this._fieldState );

        return (
            <label className={
                UserInterfaceClassName.INTEGER_FIELD
                + ' ' + UserInterfaceClassName.FIELD
                + ` ${UserInterfaceClassName.FIELD}-state-${fieldState}`
            }>
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


    private _setFieldState (value : FormFieldState) {
        this._fieldState = value;
        if (this.state.fieldState !== value) {
            this.setState({fieldState: value});
            LOG.debug(`Changed state as `, value);
        }
    }

    private _updateValueState () {

        const value : string = IntegerField.stringifyValue(this.props?.value);

        this._setStateValue(value);

    }

    private _updateFieldState () {

        LOG.debug(`_updateFieldState: state: `, this._fieldState);

        if (this._fieldState < FormFieldState.MOUNTED) return;
        if (this._fieldState >= FormFieldState.UNMOUNTED) return;

        const isValid = IntegerField.validateWithStateValue(
            this.state.value,
            this.props.value,
            this.props?.model?.required ?? false,
            this.props?.model?.minValue,
            this.props?.model?.maxValue
        );
        LOG.debug(`_updateFieldState: isValid`);

        this._setFieldState( isValid ? FormFieldState.VALID : FormFieldState.INVALID );

    }

    private _setStateValue (value: string) {

        if (value !== this.state.value) {
            this.setState({value}, () => {
                this._updateFieldState();
            });
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


    public static validateWithStateValue (
        stateValueString : string,
        propValue        : number | undefined,
        required         : boolean,
        minValue         : number | undefined,
        maxValue         : number | undefined
    ) : boolean {

        LOG.debug(`validateWithStateValue: stateValueString = `, stateValueString);

        if ( !IntegerField.validateValue(propValue, required, minValue, maxValue) ) {
            LOG.debug(`validateWithStateValue: propValue = `, propValue);
            return false;
        }

        const parsedStateValue : number | undefined = IntegerField.toInteger(stateValueString);
        LOG.debug(`validateWithStateValue: parsedStateValue = `, parsedStateValue);

        if ( parsedStateValue === undefined && stateValueString.length >= 1 && !required ) {
            LOG.debug(`validateWithStateValue: required = `, required);
            return false;
        }

        if ( !IntegerField.validateValue(parsedStateValue, required, minValue, maxValue) ) {
            return false;
        }

        LOG.debug(`validateWithStateValue: propValue = `, propValue);
        return parsedStateValue === propValue && (`${propValue ?? ''}` === stateValueString);

    }

    public static validateValue (
        internalValue : number | undefined,
        required      : boolean,
        minValue      : number | undefined,
        maxValue      : number | undefined
    ) : boolean {

        LOG.debug(`validateValue: internalValue = `, internalValue);

        if ( internalValue === undefined ) {
            LOG.debug(`validateValue: required = `, required);
            return !required;
        }

        LOG.debug(`validateValue: minValue = `, minValue);
        if (minValue !== undefined && internalValue < minValue) {
            return false;
        }

        LOG.debug(`validateValue: maxValue = `, maxValue );
        return !(maxValue !== undefined && internalValue > maxValue);

    }

    public static toInteger (value : string) : number | undefined {
        try {

            value = trim(value);
            if (value === '') return undefined;

            const parsedValue = parseInt(value, 10);

            if ( !isSafeInteger(parsedValue) ) {
                return undefined;
            }

            return parsedValue;

        } catch (err) {
            LOG.warn(`Error while parsing string as integer "${value}": `, err);
            return undefined;
        }
    }

    public static stringifyValue (value: number | undefined) : string {
        return `${value ?? ''}`;
    }

}

export default IntegerField;
