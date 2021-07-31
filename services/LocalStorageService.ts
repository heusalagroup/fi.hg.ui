// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

import AbstractStorageService, {
    isStorageServiceEvent,
    StorageObject,
    StorageServiceEvent
} from "./AbtractStorageService";
import Observer, {ObserverCallback, ObserverDestructor} from "../../ts/Observer";
import WindowService, {WindowServiceDestructor, WindowServiceEvent} from "./WindowService";

export type LocalStorageServiceDestructor = ObserverDestructor;

export class LocalStorageService extends AbstractStorageService {

    private static _observer        : Observer<StorageServiceEvent> = new Observer<StorageServiceEvent>("LocalStorageService");
    private static _storageListener : WindowServiceDestructor | undefined;

    protected static _getObserver () : Observer<StorageServiceEvent> {
        return this._observer;
    }

    protected static _getStorage () : StorageObject {
        return window.localStorage;
    }

    public static on (
        name     : StorageServiceEvent,
        callback : ObserverCallback<StorageServiceEvent>
    ) : LocalStorageServiceDestructor {

        if (isStorageServiceEvent(name)) {

            if (!this._isWatchingStorageEvent()) {
                this._initializeStorageListener();
            }

            let destructor: any = this._observer.listenEvent(name, callback);

            return () => {
                try {
                    destructor();
                    destructor = undefined;
                } finally {
                    if (
                        !this._observer.hasCallbacks(StorageServiceEvent.PROPERTY_CHANGED)
                        && !this._observer.hasCallbacks(StorageServiceEvent.PROPERTY_MODIFIED)
                        && !this._observer.hasCallbacks(StorageServiceEvent.PROPERTY_CREATED)
                        && !this._observer.hasCallbacks(StorageServiceEvent.PROPERTY_DELETED)
                        && !this._observer.hasCallbacks(StorageServiceEvent.CLEAR)
                    ) {
                        this._unInitializeStorageListener();
                    }
                }
            };

        } else {
            throw new TypeError(`LocalStorageService: Unsupported event name: ${name}`);
        }

    }

    public static hasItem (key : string) : boolean {
        return super.hasItem(key);
    }

    public static getItem (key : string) : string | null {
        return super.getItem(key);
    }

    public static removeItem (key : string) : typeof LocalStorageService {
        super.removeItem(key);
        return this;
    }

    public static setItem (key : string, value: string) : typeof LocalStorageService {
        super.setItem(key, value);
        return this;
    }

    public static removeAllItems () : typeof LocalStorageService {
        super.removeAllItems();
        return this;
    }


    private static _isWatchingStorageEvent () : boolean {
        return this._storageListener !== undefined;
    }

    private static _initializeStorageListener () {
        this._storageListener = WindowService.on(
            WindowService.Event.STORAGE_CHANGED,
            (eventName : WindowServiceEvent, event: StorageEvent) => this._onStorageEventObject(event)
        );
    }

    private static _unInitializeStorageListener () {
        if (this._storageListener) {
            this._storageListener();
            this._storageListener = undefined;
        }
    }

}

export default LocalStorageService;
