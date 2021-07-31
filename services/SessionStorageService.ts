// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

import AbstractStorageService, {StorageObject} from "./AbtractStorageService";

export class SessionStorageService extends AbstractStorageService {

    protected static _getStorage () : StorageObject {
        return window.sessionStorage;
    }

    public static hasItem (key : string) : boolean {
        return super.hasItem(key);
    }

    public static getItem (key : string) : string | null {
        return super.getItem(key);
    }

    public static removeItem (key : string) : typeof SessionStorageService {
        super.removeItem(key);
        return this;
    }

    public static setItem (key : string, value: string) : typeof SessionStorageService {
        super.setItem(key, value);
        return this;
    }

    public static removeAllItems () : typeof SessionStorageService {
        super.removeAllItems();
        return this;
    }

}

export default SessionStorageService;
