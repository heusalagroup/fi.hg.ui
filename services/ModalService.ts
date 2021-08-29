// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import ModalType from "./types/ModalType";
import Modal, { ModalComponent } from "./types/Modal";
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
    MODAL_CREATED = "ModalService:modalCreated",
    MODAL_REMOVED = "ModalService:modalRemoved",
}

export type ModalServiceDestructor = ObserverDestructor;

export class ModalService {

    private static readonly _modals   : Modal[]                     = [];
    private static readonly _observer : Observer<ModalServiceEvent> = new Observer<ModalServiceEvent>("ModalService");

    public static Event = ModalServiceEvent;

    public static getAllModals () : readonly Modal[] {
        return this._modals;
    }

    public static createModal (
        component : ModalComponent,
        type      : ModalType = ModalType.CENTER
    ) : ModalDestructor {

        const modal = new Modal(component, type);

        this._modals.push(modal);

        if (this._observer.hasCallbacks(ModalServiceEvent.MODAL_CREATED)) {
            this._observer.triggerEvent(ModalServiceEvent.MODAL_CREATED, modal);
        }

        return () => {
            this.removeModal(modal);
        };

    }

    public static removeModal (
        modal : Modal
    ) {

        const removedModals = remove(this._modals, (item : Modal) : boolean => item === modal);

        if (this._observer.hasCallbacks(ModalServiceEvent.MODAL_REMOVED) && removedModals.length) {
            const modal = removedModals.shift();
            if (modal) {
                this._observer.triggerEvent(ModalServiceEvent.MODAL_REMOVED, modal);
            }
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
