// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React, {Children} from 'react';
import './Button.scss';
import UserInterfaceClassName from "../../constants/UserInterfaceClassName";
import {EventCallback, VoidCallback} from "../../interfaces/callbacks";

export enum ButtonType {
    DEFAULT = "button",
    RESET   = "reset",
    SUBMIT  = "submit"
}

export interface ButtonState {
}

export interface ButtonClickCallback {
    () : void;
}

export interface ButtonProps {

    className ?: string;

    type : ButtonType;

    click: ButtonClickCallback;

    focus ?: VoidCallback;
    blur  ?: VoidCallback;
    keyDown ?: EventCallback<React.KeyboardEvent>;

    buttonRef ?: React.RefObject<HTMLButtonElement>;

}

export interface OnClickCallback<T> {
    (event: React.MouseEvent<T>) : void;
}

export class Button extends React.Component<ButtonProps, ButtonState> {

    static defaultProps : Partial<ButtonProps> = {
        type: ButtonType.DEFAULT
    };

    private readonly _handleClickCallback : OnClickCallback<HTMLButtonElement>;

    constructor(props: ButtonProps) {

        super(props);

        this.state = {};

        this._handleClickCallback = this._onClick.bind(this);

    }

    private _onClick (event: React.MouseEvent<HTMLButtonElement>) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (this.props.click) {
            try {
                this.props.click();
            } catch (err) {
                console.error('Error in click callback: ', err);
            }
        }

    }

    render () {

        const childCount = Children.count(this.props.children);

        const buttonProps : {
            onBlur?: any,
            onFocus?: any,
            onKeyDown?: any,
            ref?: any
        } = {};

        const blurCallback = this.props?.blur;
        if (blurCallback) {
            buttonProps.onBlur = () => blurCallback();
        }

        const focusCallback = this.props?.focus;
        if (focusCallback) {
            buttonProps.onFocus = () => focusCallback();
        }

        const buttonRef = this.props?.buttonRef;
        if (buttonRef) {
            buttonProps.ref = buttonRef;
        }

        const keyDownCallback = this.props?.keyDown;
        if (keyDownCallback) {
            buttonProps.onKeyDown = keyDownCallback;
        }

        return (
            <button
                className={
                    UserInterfaceClassName.BUTTON + ' '
                    + UserInterfaceClassName.BUTTON + `-count-${childCount}`
                    + (this.props.className ? ' ' + this.props.className : '')
                }
                type={this.props.type}
                onClick={this._handleClickCallback}
                {...buttonProps}
            >{this.props.children}</button>
        );
    }

}

export default Button;
