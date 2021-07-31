// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

//import LogService from "../../ts/LogService";
import JsonAny from "../../ts/Json";

import LocalStorageService from "./LocalStorageService";

//const LOG = LogService.createLogger('JsonLocalStorageService');

export class JsonLocalStorageService {

    public static hasItem (key : string) : boolean {
        return LocalStorageService.hasItem(key);
    }

    public static getItem (key : string) : JsonAny | null {
        const valueString = LocalStorageService.getItem(key);
        return valueString === null ? null : JSON.parse(valueString);
    }

    public static removeItem (key : string) : JsonLocalStorageService {
        LocalStorageService.removeItem(key);
        return this;
    }

    public static setItem (key : string, value: JsonAny) : JsonLocalStorageService {
        const valueString = JSON.stringify(value);
        LocalStorageService.setItem(key, valueString);
        return this;
    }

    public static removeAllItems () : JsonLocalStorageService {
        LocalStorageService.removeAllItems();
        return this;
    }

}

export default JsonLocalStorageService;
