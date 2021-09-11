// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import React from 'react';
import './SliderField.scss';
import UserInterfaceClassName from "../../../constants/UserInterfaceClassName";
import SelectFieldModel, {SelectFieldItem} from "../../../types/items/SelectFieldModel";
import FieldProps from '../FieldProps';
import LogService from "../../../../ts/LogService";
import {find, map} from "../../../../ts/modules/lodash";
import {EventCallback} from "../../../interfaces/callbacks";

const AUTOMATIC_FIELD_NAME_PREFIX = 'slider-field-';

const LOG = LogService.createLogger('SliderField');

export interface SliderFieldState {

    readonly currentItem : number;
    readonly name        : string;

}

export interface SliderFieldProps<T> extends FieldProps<SelectFieldModel<T>, T> {

    readonly values : SelectFieldItem<T>[];
    readonly name  ?: string;

}

export class SliderField extends React.Component<SliderFieldProps<any>, SliderFieldState> {

    private static _idSequence : number = 0;

    private readonly _id                  : number;
    private readonly _radioChangeCallback : EventCallback<React.ChangeEvent<HTMLInputElement>>;


    public constructor(props: SliderFieldProps<any>) {

        super(props);

        SliderField._idSequence += 1;

        this._id = SliderField._getNextId();

        const initialName = this._getInitialName();

        this.state = {
            name: initialName,
            currentItem: 0
        };

        this._radioChangeCallback = this._onRadioChange.bind(this);

    }

    public componentDidMount() {

        this._updateNameToStateIfChanged();

    }

    public componentDidUpdate(prevProps: Readonly<SliderFieldProps<any>>, prevState: Readonly<SliderFieldState>, snapshot?: any) {

        this._updateNameToStateIfChanged();

    }

    public render () {

        const sliderName = this.state.name;

        const label       = this.props?.label          ?? this.props.model?.label;
        const value       : any = this.props?.value    ?? undefined;

        LOG.debug('Selected value: ', value);

        const selectItems : SelectFieldItem<any>[] = this.props?.values ?? this.props?.model?.values ?? [];

        const selectedItem : SelectFieldItem<any> | undefined = find(selectItems, (item : SelectFieldItem<any>) : boolean => {
            return item?.value === value;
        });

        LOG.debug('Selected item: ', selectedItem);

        // const selectedItemLabel : string = selectedItem?.label ?? '';

        const itemCount = selectItems.length;

        return (
            <div className={
                UserInterfaceClassName.SLIDER_FIELD
                + ' ' + (this.props.className ?? '')
                + ' ' + UserInterfaceClassName.FIELD
            }>

                {label ? (
                    <label className={UserInterfaceClassName.SLIDER_FIELD+'-label'}>{label}</label>
                ) : null}

                <div className={UserInterfaceClassName.SLIDER_FIELD + '-options'}>
                    {map(selectItems, (item : SelectFieldItem<any>, itemIndex: number) => {

                        const itemLabel    : string  = item?.label ?? '';
                        const itemValue    : any     = item?.value ?? undefined;
                        const itemSelected : boolean = selectedItem ? itemValue === selectedItem?.value : false;

                        LOG.debug('item: ', itemLabel, itemValue, itemSelected);

                        const itemProps : {checked?: boolean} = {};
                        if (itemSelected) {
                            itemProps.checked = true;
                        }

                        return (
                            <label
                                key={`slider-${this._id}-label-${itemIndex}`}
                                className={UserInterfaceClassName.SLIDER_FIELD + '-option'}
                            >

                                <div className={UserInterfaceClassName.SLIDER_FIELD + '-option-input'}>
                                    <div className={
                                        UserInterfaceClassName.SLIDER_FIELD + '-option-input-fill '
                                        + UserInterfaceClassName.SLIDER_FIELD + '-option-input-fill-with-'
                                            + (itemIndex !== 0 ? 'line' : 'no-line')
                                    } />
                                    <input
                                        className={UserInterfaceClassName.SLIDER_FIELD+'-option-input-element'}
                                        type="radio"
                                        name={sliderName}
                                        value={`${itemIndex}`}
                                        onChange={this._radioChangeCallback}
                                        autoComplete="off"
                                        {...itemProps}
                                    />
                                    <div className={
                                        UserInterfaceClassName.SLIDER_FIELD + '-option-input-fill '
                                        + UserInterfaceClassName.SLIDER_FIELD + '-option-input-fill-with-'
                                        + (itemIndex !== itemCount - 1 ? 'line' : 'no-line')
                                    } />
                                </div>

                                <div className={UserInterfaceClassName.SLIDER_FIELD + '-option-label'}>
                                    {itemLabel ? (
                                        <span className={UserInterfaceClassName.SLIDER_FIELD+'-option-label-text'}>{itemLabel}</span>
                                    ) : null}
                                </div>

                            </label>
                        );
                    })}
                </div>

            </div>
        );

    }


    private _getInitialName () : string {
        return this.props?.name ?? `${AUTOMATIC_FIELD_NAME_PREFIX}${this._id}`;
    }

    private _updateNameToStateIfChanged () {
        const propName = this._getInitialName();
        if (propName !== this.state.name) {
            this.setState({name: propName});
        }
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

    /**
     *
     * @param index
     * @private
     */
    private _selectItem (index: number) {

        LOG.debug('_selectItem: Click on index ', index);

        const selectItems : SelectFieldItem<any>[] = this.props?.values ?? this.props?.model?.values ?? [];

        if (index < selectItems.length) {

            const value = selectItems[index]?.value;

            this._change(value);

        } else {
            LOG.error('_selectItem: No item on index ', index);
        }

    }

    private _onRadioChange (event : React.ChangeEvent<HTMLInputElement>) {

        const valueString = event?.target?.value ?? '';
        LOG.debug('_onRadioChange: valueString=', valueString);
        const valueIndex = valueString ? parseInt(valueString, 10) : undefined;
        LOG.debug('_onRadioChange: valueIndex=', valueIndex);

        if (valueIndex !== undefined) {
            this._selectItem(valueIndex);
        } else {
            LOG.warn('_onRadioChange: value invalid: ', valueString);
        }

    }


    private static _getNextId () : number {
        this._idSequence += 1;
        return this._idSequence;
    }

}

export default SliderField;
