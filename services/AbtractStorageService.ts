// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

export interface StorageObject {
    getItem(key: string) : string | null;
    setItem(key: string, value: string) : void;
    removeItem(key: string) : void;
    clear() : void;
}

export abstract class AbstractStorageService {

    protected static _getStorage () : StorageObject {
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
