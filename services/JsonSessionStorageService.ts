// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

//import LogService from "../../ts/LogService";
import JsonAny from "../../ts/Json";

import SessionStorageService, {SessionStorageServiceDestructor} from "./SessionStorageService";
import {StorageServiceEvent} from "./AbtractStorageService";
import {ObserverCallback} from "../../ts/Observer";

//const LOG = LogService.createLogger('JsonSessionStorageService');

export class JsonSessionStorageService {

    public static Event = SessionStorageService.Event;

    /**
     * This is just a wrapper for SessionStorageService.on(name, callback)
     *
     * @param name
     * @param callback
     */
    public static on (
        name     : StorageServiceEvent,
        callback : ObserverCallback<StorageServiceEvent>
    ) : SessionStorageServiceDestructor {
        return SessionStorageService.on(name, callback);
    }

    public static hasItem (key : string) : boolean {
        return SessionStorageService.hasItem(key);
    }

    public static getItem (key : string) : JsonAny | null {
        const valueString = SessionStorageService.getItem(key);
        return valueString === null ? null : JSON.parse(valueString);
    }

    public static removeItem (key : string) : JsonSessionStorageService {
        SessionStorageService.removeItem(key);
        return this;
    }

    public static setItem (key : string, value: JsonAny) : JsonSessionStorageService {
        const valueString = JSON.stringify(value);
        SessionStorageService.setItem(key, valueString);
        return this;
    }

    public static removeAllItems () : JsonSessionStorageService {
        SessionStorageService.removeAllItems();
        return this;
    }

}

export default JsonSessionStorageService;
