// Copyright (c) 2021 Sendanor. All rights reserved.

import Observer, {ObserverCallback, ObserverDestructor} from "../../ts/Observer";
import LogService from "../../ts/LogService";
import {isString, trim} from "../../ts/modules/lodash";

const LOG = LogService.createLogger('WindowService');

export enum WindowColorScheme {
    DARK,
    LIGHT
}

export function isWindowColorScheme (value : any) : value is WindowColorScheme {
    switch(value) {

        case WindowColorScheme.DARK:
        case WindowColorScheme.LIGHT:
            return true;

        default:
            return false;
    }
}

export function parseWindowColorScheme (value : any) : WindowColorScheme | undefined {

    if (isWindowColorScheme(value)) return value;

    if (isString(value)) {
        value = trim(value).toUpperCase();
        switch(value) {
            case 'DARK'  : return WindowColorScheme.DARK;
            case 'LIGHT' : return WindowColorScheme.LIGHT;
            default      : return undefined;
        }
    }

    return undefined;

}

export function stringifyWindowColorScheme (value: WindowColorScheme) : string {
    switch (value) {
        case WindowColorScheme.DARK  : return 'DARK';
        case WindowColorScheme.LIGHT : return 'LIGHT';
        default                      : return `WindowColorScheme(${value})`;
    }
}

export enum WindowServiceEvent {

    COLOR_SCHEME_CHANGED = "WindowServiceEvent:colorScheme",

    STORAGE_CHANGED = "WindowServiceEvent:storage"

}

export interface WindowColorSchemeEventCallback {
    (event: WindowServiceEvent, scheme: WindowColorScheme) : void;
}

export type WindowServiceDestructor = ObserverDestructor;

interface MediaQueryListChangeCallback {
    (e : MediaQueryListEvent) : void;
}

export const DARK_COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export interface StorageCallback {
    (event: StorageEvent): void;
}

export class WindowService {

    private static _observer : Observer<WindowServiceEvent> = new Observer<WindowServiceEvent>("WindowService");
    private static _watchMediaDarkScheme  : MediaQueryList | undefined;
    private static _watchMediaLightScheme : MediaQueryList | undefined;
    private static _colorScheme           : WindowColorScheme | undefined;
    private static _darkColorSchemeChangeCallback  : MediaQueryListChangeCallback | undefined;
    private static _storageCallback                : StorageCallback | undefined;


    public static Event = WindowServiceEvent;

    public static isDarkModeEnabled () : boolean {
        return this.getColorScheme() === WindowColorScheme.DARK;
    }

    public static isLightModeEnabled () : boolean {
        return this.getColorScheme() === WindowColorScheme.LIGHT;
    }

    public static getColorScheme () : WindowColorScheme {

        let colorScheme = this._colorScheme;

        if (colorScheme === undefined) {
            colorScheme = this._getColorScheme();
            this._colorScheme = colorScheme;
            LOG.info(`Color colorScheme initialized as ${stringifyWindowColorScheme(colorScheme)}`);
            return colorScheme;
        }

        return colorScheme;

    }

    public static setColorScheme (value: WindowColorScheme) {

        if (this._colorScheme !== value) {
            this._colorScheme = value;
            if (this._observer.hasCallbacks(WindowServiceEvent.COLOR_SCHEME_CHANGED)) {
                this._observer.triggerEvent(WindowServiceEvent.COLOR_SCHEME_CHANGED, value);
            }
        }

    }

    public static on (
        name : WindowServiceEvent,
        callback: ObserverCallback<WindowServiceEvent>
    ) : WindowServiceDestructor {

        if (name === WindowServiceEvent.COLOR_SCHEME_CHANGED) {

            if (!this._isWatchingMediaScheme()) {
                this._initializeMediaSchemeListeners();
            }

            let destructor : any = this._observer.listenEvent(name, callback);

            return () => {
                try {
                    destructor();
                    destructor = undefined;
                } finally {
                    if (!this._observer.hasCallbacks(WindowServiceEvent.COLOR_SCHEME_CHANGED)) {
                        this._unInitializeMediaSchemeListeners();
                    }
                }
            };

        } else if (name === WindowServiceEvent.STORAGE_CHANGED) {

            if (!this._isWatchingStorageEvent()) {
                this._initializeStorageListener();
            }

            let destructor: any = this._observer.listenEvent(name, callback);

            return () => {
                try {
                    destructor();
                    destructor = undefined;
                } finally {
                    if (!this._observer.hasCallbacks(WindowServiceEvent.STORAGE_CHANGED)) {
                        this._unInitializeStorageListener();
                    }
                }
            };

        } else {
            throw new TypeError(`WindowService: Unsupported event name: ${name}`);
        }

    }

    public static destroy () {

        this._unInitializeMediaSchemeListeners();
        this._unInitializeStorageListener();
        this._colorScheme = undefined;

    }


    private static _isWatchingStorageEvent () : boolean {
        return this._storageCallback !== undefined;
    }

    private static _initializeStorageListener () {

        if (this._storageCallback) {
            this._unInitializeStorageListener();
        }

        this._storageCallback = this._onStorageEvent.bind(this);

        window.addEventListener('storage', this._storageCallback);

    }

    private static _unInitializeStorageListener () {

        if (this._storageCallback) {
            window.removeEventListener('storage', this._storageCallback);
            this._storageCallback = undefined;
        }

    }

    private static _onStorageEvent (event: StorageEvent) {

        // const key         : string | null = event?.key;
        // const newValue    : string | null = event?.newValue;
        // const oldValue    : string | null = event?.oldValue;
        // const storageArea : Storage | null = event?.storageArea;
        // const url         : string = event?.url;

        this._observer.triggerEvent(WindowServiceEvent.STORAGE_CHANGED, event);

    }


    private static _isDarkModeEnabled () : boolean {
        return !!window.matchMedia && !!window.matchMedia(DARK_COLOR_SCHEME_QUERY)?.matches;
    }

    private static _getColorScheme () : WindowColorScheme {
        return this._isDarkModeEnabled() ? WindowColorScheme.DARK : WindowColorScheme.LIGHT;
    }

    private static _isWatchingMediaScheme () : boolean {
        return !!this._watchMediaDarkScheme && !!this._watchMediaLightScheme;
    }

    private static _initializeMediaSchemeListeners () {

        if ( this._watchMediaDarkScheme || this._watchMediaLightScheme ) {
            this._unInitializeMediaSchemeListeners();
        }

        const darkCallback = this._darkColorSchemeChangeCallback = this._onDarkColorSchemeChange.bind(this);
        this._watchMediaDarkScheme = window.matchMedia(DARK_COLOR_SCHEME_QUERY);
        this._watchMediaDarkScheme.addEventListener('change', darkCallback);

        if (this._colorScheme === undefined) {
            const colorScheme = this._watchMediaDarkScheme.matches ? WindowColorScheme.DARK : WindowColorScheme.LIGHT;
            if (this._colorScheme !== colorScheme) {
                this._colorScheme = colorScheme;
                LOG.info(`Color colorScheme initialized as ${stringifyWindowColorScheme(colorScheme)}`);
            }
        }

    }

    private static _unInitializeMediaSchemeListeners () {

        const darkCallback = this._darkColorSchemeChangeCallback;
        if ( this._watchMediaDarkScheme !== undefined && darkCallback !== undefined ) {
            this._watchMediaDarkScheme.removeEventListener('change', darkCallback);
            this._watchMediaDarkScheme = undefined;
            this._darkColorSchemeChangeCallback = undefined;
        }

    }

    private static _onDarkColorSchemeChange (e : MediaQueryListEvent) {
        const newColorScheme : WindowColorScheme = e.matches ? WindowColorScheme.DARK : WindowColorScheme.LIGHT;
        if (newColorScheme !== this._colorScheme) {
            this._colorScheme = newColorScheme;
            LOG.info(`Color scheme changed as ${stringifyWindowColorScheme(newColorScheme)}`);
            this._observer.triggerEvent(WindowServiceEvent.COLOR_SCHEME_CHANGED, newColorScheme);
        } else {
            LOG.debug(`Color scheme was already same ${stringifyWindowColorScheme(newColorScheme)}`);
        }
    }

}

export default WindowService;
