// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

import Observer, {ObserverCallback} from "../../ts/Observer";
import {LocalStorageServiceDestructor} from "./LocalStorageService";

export enum StorageServiceEvent {

    /**
     * Called for any type: created, deleted, or modified
     */
    PROPERTY_CHANGED  = "StorageService:propertyChanged",

    /**
     * Only called when property is created
     */
    PROPERTY_CREATED  = "StorageService:propertyCreated",

    /**
     * Only called when property is deleted
     */
    PROPERTY_DELETED  = "StorageService:propertyDeleted",

    /**
     * Only called when property is modified
     */
    PROPERTY_MODIFIED = "StorageService:propertyModified",

    /** Called when every property has been removed */
    CLEAR             = "StorageService:clear",

}

export function isStorageServiceEvent (value : any) : value is StorageServiceEvent {

    switch (value) {
        case StorageServiceEvent.PROPERTY_CHANGED:
        case StorageServiceEvent.PROPERTY_CREATED:
        case StorageServiceEvent.PROPERTY_DELETED:
        case StorageServiceEvent.PROPERTY_MODIFIED:
        case StorageServiceEvent.CLEAR:
            return true;

        default:
            return false;

    }
}

export interface StorageObject {
    getItem(key: string) : string | null;
    setItem(key: string, value: string) : void;
    removeItem(key: string) : void;
    clear() : void;
}

export abstract class AbstractStorageService {

    public static Event = StorageServiceEvent;

    protected static _getObserver () : Observer<StorageServiceEvent> {
        throw new Error('Must be implemented: _getObserver');
    }

    protected static _getStorage () : StorageObject {
        throw new Error('Must be implemented: _getStorage');
    }

    protected static _onStorageEventObject (event: StorageEvent) {
        if (event.storageArea === this._getStorage()) {
            this._onStorageEvent(event.key, event.newValue, event.oldValue);
        }
    }

    protected static _onStorageEvent (
        key      : string | null,
        value    : string | null,
        oldValue : string | null
    ) {

        const observer = this._getObserver();

        if (key === null) {
            if (observer.hasCallbacks(StorageServiceEvent.CLEAR)) {
                observer.triggerEvent(StorageServiceEvent.CLEAR);
            }
            return;
        }

        if (value === null) {
            if (observer.hasCallbacks(StorageServiceEvent.PROPERTY_DELETED)) {
                observer.triggerEvent(StorageServiceEvent.PROPERTY_DELETED, key);
            }
        } else if (oldValue === null) {
            if (observer.hasCallbacks(StorageServiceEvent.PROPERTY_CREATED)) {
                observer.triggerEvent(StorageServiceEvent.PROPERTY_CREATED, key);
            }
        } else {
            if (observer.hasCallbacks(StorageServiceEvent.PROPERTY_MODIFIED)) {
                observer.triggerEvent(StorageServiceEvent.PROPERTY_MODIFIED, key);
            }
        }

        if (observer.hasCallbacks(StorageServiceEvent.PROPERTY_CHANGED)) {
            observer.triggerEvent(StorageServiceEvent.PROPERTY_CHANGED, key);
        }

    }


    public static on (
        name     : StorageServiceEvent,
        callback : ObserverCallback<StorageServiceEvent>
    ) : LocalStorageServiceDestructor {
        throw new Error('Must be implemented');
    }

    public static hasItem (key : string) : boolean {
        return this._getStorage().getItem(key) !== null;
    }

    public static getItem (key : string) : string | null {
        return this._getStorage().getItem(key);
    }

    public static removeItem (key : string) : typeof AbstractStorageService {
        this._getStorage().removeItem(key);
        return this;
    }

    public static setItem (key : string, value: string) : typeof AbstractStorageService {
        this._getStorage().setItem(key, value);
        return this;
    }

    public static removeAllItems () : typeof AbstractStorageService {
        this._getStorage().clear();
        return this;
    }

}

export default AbstractStorageService;
