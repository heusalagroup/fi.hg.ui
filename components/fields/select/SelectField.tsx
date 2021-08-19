// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './SelectField.scss';
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import SelectFieldModel, {SelectFieldItem} from "../../../types/items/SelectFieldModel";
import FieldProps from '../FieldProps';
import LogService from "../../../../ts/LogService";
import {find, findIndex, map, some} from "../../../../ts/modules/lodash";
import Popup from "../../popup/Popup";
import {EventCallback, VoidCallback} from "../../../interfaces/callbacks";
import Button from "../../button/Button";

const LOG = LogService.createLogger('SelectField');

const CLOSE_DROPDOWN_TIMEOUT_ON_BLUR = 100;
const MOVE_TO_ITEM_ON_OPEN_DROPDOWN_TIMEOUT = 100;

export interface SelectFieldState {

    dropdownOpen : boolean;

    currentItem : number;

}

export interface SelectFieldProps<T> extends FieldProps<SelectFieldModel<T>, T> {

    readonly values : SelectFieldItem<T>[];

}

export class SelectField extends React.Component<SelectFieldProps<any>, SelectFieldState> {

    private readonly _inputRef        : React.RefObject<HTMLInputElement>;
    private readonly _focusCallback   : VoidCallback;
    private readonly _blurCallback    : VoidCallback;
    private readonly _keyDownCallback : EventCallback<React.KeyboardEvent>;

    private _buttonRefs : React.RefObject<HTMLButtonElement>[];

    private _closeDropdownTimeout : any;
    private _openDropdownTimeout  : any;

    constructor(props: SelectFieldProps<any>) {

        super(props);

        this.state = {
            dropdownOpen: false,
            currentItem: 0
        };

        this._buttonRefs = [];

        this._inputRef = React.createRef();
        this._focusCallback = this._onFocus.bind(this);
        this._blurCallback  = this._onBlur.bind(this);
        this._keyDownCallback = this._onKeyDown.bind(this);

    }

    componentDidMount() {

        if ( this._inputHasFocus() ) {
            this._openDropdown();
            this._delayedMoveToFirstItem();
        }

    }

    componentWillUnmount() {

        if (this._closeDropdownTimeout) {
            clearTimeout(this._closeDropdownTimeout);
            this._closeDropdownTimeout = undefined;
        }

        if (this._openDropdownTimeout) {
            clearTimeout(this._openDropdownTimeout);
            this._openDropdownTimeout = undefined;
        }

    }

    render () {

        const label       = this.props?.label          ?? this.props.model?.label;
        const placeholder = this.props?.placeholder    ?? this.props.model?.placeholder;
        const value       : any = this.props?.value    ?? undefined;

        const selectItems : SelectFieldItem<any>[] = this.props?.values ?? this.props?.model?.values ?? [];

        const selectedItem : SelectFieldItem<any> | undefined = find(selectItems, (item : SelectFieldItem<any>) : boolean => {
            return item?.value === value;
        });

        const selectedItemLabel : string = selectedItem?.label ?? '';

        const currentItemIndex : number = this.state.currentItem;

        return (
            <div className={
                UserInterfaceClassName.SELECT_FIELD
                + ' ' + (this.props.className ?? '')
                + ' ' + UserInterfaceClassName.FIELD
            }>

                <label className={UserInterfaceClassName.SELECT_FIELD + '-label'}>

                    {label ? (
                        <span className={UserInterfaceClassName.SELECT_FIELD+'-label'}>{label}</span>
                    ) : null}

                    <input
                       ref={this._inputRef}
                       className={UserInterfaceClassName.SELECT_FIELD+'-input'}
                       type="text"
                       autoComplete="off"
                       placeholder={placeholder}
                       value={selectedItemLabel}
                       onFocus={this._focusCallback}
                       onBlur={this._blurCallback}
                       onChange={(event) => {
                           SelectField._cancelKeyEvent(event);
                       }}
                       onKeyDown={this._keyDownCallback}
                    />

                    {this.props.children}

                </label>

                <Popup open={this.state.dropdownOpen}>
                    <div className={UserInterfaceClassName.SELECT_FIELD + '-dropdown'}>
                        {map(selectItems, (selectItem : SelectFieldItem<any>, itemIndex: number) : any => {

                            const isCurrentButton = itemIndex === currentItemIndex;

                            const itemClickCallback = () => this._selectItem(itemIndex);

                            if (itemIndex >= this._buttonRefs.length) {
                                this._buttonRefs[itemIndex] = React.createRef<HTMLButtonElement>();
                            }

                            const itemButtonRef = this._buttonRefs[itemIndex];

                            return (
                                <Button
                                    key={`dropdown-item-${itemIndex}-value-${selectItem.value}`}
                                    buttonRef={itemButtonRef}
                                    className={
                                        UserInterfaceClassName.SELECT_FIELD + '-dropdown-item'
                                        + ' ' + (isCurrentButton ? UserInterfaceClassName.SELECT_FIELD + '-dropdown-item-current' : '')
                                    }
                                    focus={this._focusCallback}
                                    blur={this._blurCallback}
                                    click={itemClickCallback}
                                    keyDown={this._keyDownCallback}
                                >{selectItem?.label ?? ''}</Button>
                            );

                        })}
                    </div>
                </Popup>

            </div>
        );

    }

    private _inputHasFocus () : boolean {

        if (!document.hasFocus()) {
            return false;
        }

        const inputElement         : HTMLInputElement | null | undefined = this._inputRef?.current;

        const inputElementHasFocus : boolean = inputElement ? SelectField._elementHasFocus(inputElement) : false;

        return inputElementHasFocus || some(this._buttonRefs, (item: React.RefObject<HTMLButtonElement>) : boolean => {
            const currentElement : HTMLButtonElement | null | undefined = item?.current;
            return currentElement ? SelectField._elementHasFocus(currentElement) : false;
        });

    }

    private static _elementHasFocus (el : HTMLInputElement | HTMLButtonElement) : boolean {
        return el.contains(document.activeElement);
    }

    private _change (value: any) {

        LOG.debug('_change: value = ', value);

        if (this.props.change) {
            try {
                this.props.change(value);
            } catch (err) {
                LOG.error('Error in change prop: ', err);
            }
        } else {
            LOG.warn('No change prop defined!');
        }

    }

    private _onFocus () {

        if (!this.state.dropdownOpen) {

            this._openDropdown();
            this._delayedMoveToFirstItem();

        } else {
            this._updateCurrentItemFromFocus();
        }

    }

    private _delayedMoveToFirstItem () {

        if (this._openDropdownTimeout) {
            clearTimeout(this._openDropdownTimeout);
        }

        this._openDropdownTimeout = setTimeout(() => {
            if (this.state.dropdownOpen) {
                this._moveCurrentItemTo(0);
            } else {
                LOG.warn('Warning! Dropdown not open yet.');
            }
        }, MOVE_TO_ITEM_ON_OPEN_DROPDOWN_TIMEOUT);

    }

    private _onBlur () {

        if (!this.state.dropdownOpen) {
            LOG.debug('_onBlur: Dropdown not open');
            return;
        }

        if (this._closeDropdownTimeout) {
            clearTimeout(this._closeDropdownTimeout);
        }

        this._closeDropdownTimeout = setTimeout(() => {

            if (this.state.dropdownOpen) {
                if (!this._inputHasFocus()) {
                    LOG.debug('_onBlur: Closing dropdown after timeout');
                    this._closeDropdown();
                } else {
                    LOG.debug('_onBlur: Select has focus still; not closing dropdown.');
                }
            } else {
                LOG.debug('_onBlur: Dropdown is not open anymore');
            }
        }, CLOSE_DROPDOWN_TIMEOUT_ON_BLUR);

    }

    private _selectItem (index: number) {

        LOG.debug('_selectItem: Click on index ', index);

        const selectItems : SelectFieldItem<any>[] = this.props?.values ?? this.props?.model?.values ?? [];

        if (index < selectItems.length) {

            const value = selectItems[index]?.value;

            this._change(value);

            this._closeDropdown();

        } else {
            LOG.error('_selectItem: No item on index ', index);
        }

    }

    private _closeDropdown () {

        this.setState({dropdownOpen: false});

        const inputEl = this._inputRef?.current;
        if (inputEl) {
            inputEl.focus();
        }

    }

    private _openDropdown () {
        this.setState({dropdownOpen: true});
    }

    private static _cancelKeyEvent (event : React.KeyboardEvent | React.ChangeEvent) {

        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

    }

    private _onKeyDown (event : React.KeyboardEvent) {

        LOG.debug('_onKeyDown: Keycode set: ', event?.code);
        switch(event?.code) {

            case 'Enter':
                SelectField._cancelKeyEvent(event);
                return this._onEnter();

            case 'ArrowUp':
                SelectField._cancelKeyEvent(event);
                return this._movePrevItem();

            case 'ArrowDown':
                SelectField._cancelKeyEvent(event);
                return this._moveNextItem();

            case 'Tab':
                return;

            case 'Backspace':
            case 'Escape':
                if (this.state.dropdownOpen) {
                    SelectField._cancelKeyEvent(event);
                    return this._closeDropdown();
                } else {
                    return;
                }

        }

        LOG.debug('No keycode set: ', event?.code);
        SelectField._cancelKeyEvent(event);

        if (!this.state.dropdownOpen) {
            this._openDropdown();
            this._delayedMoveToFirstItem();
        }

    }

    private _onEnter() {

        if (this.state.dropdownOpen) {
            return this._selectItem(this.state.currentItem);
        } else {
            this._openDropdown();
            this._delayedMoveToFirstItem();
        }

    }

    private _moveCurrentItemTo (nextItem: number) {

        this.setState( (state : SelectFieldState) => {

            const selectItems : SelectFieldItem<any>[] = this.props?.values ?? this.props?.model?.values ?? [];

            const totalItems = selectItems.length;

            const nextCurrentIndex = nextItem >= 0 && nextItem < totalItems ? nextItem : state.currentItem;

            if (nextCurrentIndex < this._buttonRefs.length) {
                const el = this._buttonRefs[nextCurrentIndex]?.current;
                if (el) {
                    el.focus();
                }
            }

            return {
                currentItem: nextCurrentIndex,
                dropdownOpen: true
            };

        });

    }

    private _movePrevItem () {

        this.setState( (state : SelectFieldState) => {

            const selectItems : SelectFieldItem<any>[] = this.props?.values ?? this.props?.model?.values ?? [];

            const totalItems = selectItems.length;

            const currentItem = state.currentItem;

            const nextItem = currentItem - 1;

            const nextCurrentIndex = nextItem >= 0 ? nextItem : totalItems - 1;

            if (nextCurrentIndex < this._buttonRefs.length) {
                const el = this._buttonRefs[nextCurrentIndex]?.current;
                if (el) {
                    el.focus();
                }
            }

            return {
                currentItem: nextCurrentIndex,
                dropdownOpen: true
            };

        });

    }

    private _moveNextItem () {

        this.setState( (state : SelectFieldState) => {

            const selectItems : SelectFieldItem<any>[] = this.props?.values ?? this.props?.model?.values ?? [];

            const totalItems = selectItems.length;

            const currentItem = state.currentItem;

            const nextItem = currentItem + 1;

            const nextCurrentIndex = nextItem < totalItems ? nextItem : 0;

            if (nextCurrentIndex < this._buttonRefs.length) {
                const el = this._buttonRefs[nextCurrentIndex]?.current;
                if (el) {
                    el.focus();
                }
            }

            return {
                currentItem: nextCurrentIndex,
                dropdownOpen: true
            };

        });

    }

    private _updateCurrentItemFromFocus () {

        if (!document.hasFocus()) {
            LOG.debug('_updateCurrentItemFromFocus: Document has no focus');
            return;
        }

        const buttonIndex = findIndex(this._buttonRefs, (item: React.RefObject<HTMLButtonElement>) : boolean => {
            const currentElement : HTMLButtonElement | null | undefined = item?.current;
            return currentElement ? SelectField._elementHasFocus(currentElement) : false;
        });

        if (this.state.currentItem === buttonIndex) {
            LOG.debug('_updateCurrentItemFromFocus: Focus already on current item');
            return;
        }

        LOG.debug('_updateCurrentItemFromFocus: Selecting item: ', buttonIndex);

        this.setState({
            currentItem: buttonIndex
        });

    }

}

export default SelectField;
