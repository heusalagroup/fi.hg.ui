// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import ModalType from "./types/ModalType";
import Modal, { ModalComponentType } from "./types/Modal";
import {
    concat,
    forEach,
    remove
} from "../../ts/modules/lodash";
import Observer, { ObserverCallback, ObserverDestructor } from "../../ts/Observer";

export interface ModalDestructor {
    (): void;
}

export enum ModalServiceEvent {
    MODAL_CREATED         = "ModalService:modalCreated",
    MODAL_REMOVED         = "ModalService:modalRemoved",
    CURRENT_MODAL_CHANGED = "ModalService:currentModalChanged",
}

export interface ModalEventCallback {
    (eventType: ModalServiceEvent, modal: Modal): void;
}

export type ModalServiceDestructor = ObserverDestructor;

export class ModalService {

    private static readonly _modals   : Modal[]                     = [];
    private static readonly _observer : Observer<ModalServiceEvent> = new Observer<ModalServiceEvent>("ModalService");

    public static Event = ModalServiceEvent;

    public static getAllModals () : readonly Modal[] {
        return this._modals;
    }

    public static getCurrentModal () : Modal | undefined {

        if (this._modals.length) {
            return this._modals[this._modals.length - 1];
        } else {
            return undefined;
        }

    }

    public static createModal (
        component : ModalComponentType,
        type      : ModalType = ModalType.CENTER
    ) : ModalDestructor {

        const modal = new Modal(component, type);

        this._modals.push(modal);

        if (this._observer.hasCallbacks(ModalServiceEvent.MODAL_CREATED)) {
            this._observer.triggerEvent(ModalServiceEvent.MODAL_CREATED, modal);
        }

        if (this._observer.hasCallbacks(ModalServiceEvent.CURRENT_MODAL_CHANGED)) {
            this._observer.triggerEvent(ModalServiceEvent.CURRENT_MODAL_CHANGED, modal);
        }

        return () => {
            this.removeModal(modal);
        };

    }

    public static removeModal (
        modal : Modal
    ) {

        const isCurrentModal = this.getCurrentModal() === modal;

        const removedModals = remove(this._modals, (item : Modal) : boolean => item === modal);

        if (this._observer.hasCallbacks(ModalServiceEvent.MODAL_REMOVED) && removedModals.length) {
            const modal = removedModals.shift();
            if (modal) {
                this._observer.triggerEvent(ModalServiceEvent.MODAL_REMOVED, modal);
            }
        }

        if (isCurrentModal && this._observer.hasCallbacks(ModalServiceEvent.CURRENT_MODAL_CHANGED)) {
            this._observer.triggerEvent(ModalServiceEvent.CURRENT_MODAL_CHANGED, modal);
        }

    }

    public static on (
        name     : ModalServiceEvent,
        callback : ObserverCallback<ModalServiceEvent>
    ): ModalServiceDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public static destroy (): void {

        const modals = concat([], this._modals);
        forEach(modals, modal => {
            this.removeModal(modal);
        });

        this._observer.destroy();

    }

}

export default ModalService;
