// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

import AbstractStorageService, {StorageObject} from "./AbtractStorageService";

export class LocalStorageService extends AbstractStorageService {

    protected static _getStorage () : StorageObject {
        return window.localStorage;
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

}

export default LocalStorageService;
