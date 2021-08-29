// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import ModalType from "./ModalType";
import Json from "../../../ts/Json";

export type ModalComponent = any;

let MODAL_ID_SEQUENCER = 0;

export class Modal {

    private readonly _id        : string;
    private readonly _component : ModalComponent;
    private readonly _type      : ModalType;

    public constructor (
        component : ModalComponent,
        type      : ModalType = ModalType.CENTER
    ) {

        const id = MODAL_ID_SEQUENCER += 1;

        this._id        = `Modal_${id}`;
        this._component = component;
        this._type      = type;

    }

    public getId (): string {
        return this._id;
    }

    public getComponent (): any {
        return this._component;
    }

    public getType (): ModalType {
        return this._type;
    }

    public toString (): string {
        return this._id;
    }

    public toJSON (): Json {
        return {
            type      : 'Modal',
            id        : this._id,
            modalType : this._type
        };
    }

}

export function isModal (value: any): value is Modal {
    return value instanceof Modal;
}

export default Modal;
