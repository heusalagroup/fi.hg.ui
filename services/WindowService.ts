// Copyright (c) 2021 Sendanor. All rights reserved.

import Observer, {ObserverCallback, ObserverDestructor} from "../../ts/Observer";
import LogService from "../../ts/LogService";

const LOG = LogService.createLogger('WindowService');

export enum WindowColorScheme {
    DARK,
    LIGHT
}

export function stringifyWindowColorScheme (value: WindowColorScheme) : string {
    switch (value) {
        case WindowColorScheme.DARK  : return 'DARK';
        case WindowColorScheme.LIGHT : return 'LIGHT';
        default                      : return `WindowColorScheme(${value})`;
    }
}

export enum WindowServiceEvent {

    COLOR_SCHEME_CHANGED = "WindowServiceEvent:colorScheme"

}

export interface WindowColorSchemeEventCallback {
    (event: WindowServiceEvent, scheme: WindowColorScheme) : void;
}

export type WindowServiceDestructor = ObserverDestructor;

interface MediaQueryListChangeCallback {
    (e : MediaQueryListEvent) : void;
}

export const DARK_COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export class WindowService {

    private static _observer : Observer<WindowServiceEvent> = new Observer<WindowServiceEvent>("WindowService");
    private static _watchMediaDarkScheme  : MediaQueryList | undefined;
    private static _watchMediaLightScheme : MediaQueryList | undefined;
    private static _colorScheme           : WindowColorScheme | undefined;
    private static _darkColorSchemeChangeCallback  : MediaQueryListChangeCallback | undefined;


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

    public static on (name : WindowServiceEvent, callback: ObserverCallback<WindowServiceEvent>) : WindowServiceDestructor {

        if (name === WindowServiceEvent.COLOR_SCHEME_CHANGED) {

            if (!this._isInitialized()) {
                this._initialize();
            }

            const destructor = this._observer.listenEvent(name, callback);

            return () => {
                try {
                    destructor();
                } finally {
                    if (!this._observer.hasCallbacks(WindowServiceEvent.COLOR_SCHEME_CHANGED)) {
                        this._unInitialize();
                    }
                }
            };

        } else {

            return this._observer.listenEvent(name, callback);

        }

    }

    public static destroy () {
        this._unInitialize();
    }


    private static _isDarkModeEnabled () : boolean {
        return !!window.matchMedia && !!window.matchMedia(DARK_COLOR_SCHEME_QUERY)?.matches;
    }

    private static _getColorScheme () : WindowColorScheme {
        return this._isDarkModeEnabled() ? WindowColorScheme.DARK : WindowColorScheme.LIGHT;
    }

    private static _isInitialized () : boolean {
        return !!this._watchMediaDarkScheme && !!this._watchMediaLightScheme;
    }

    private static _initialize () {

        if ( this._watchMediaDarkScheme || this._watchMediaLightScheme ) {
            this._unInitialize();
        }

        const darkCallback = this._darkColorSchemeChangeCallback = this._onDarkColorSchemeChange.bind(this);
        this._watchMediaDarkScheme = window.matchMedia(DARK_COLOR_SCHEME_QUERY);
        this._watchMediaDarkScheme.addEventListener('change', darkCallback);

        const colorScheme = this._watchMediaDarkScheme.matches ? WindowColorScheme.DARK : WindowColorScheme.LIGHT;
        if (this._colorScheme !== colorScheme) {
            this._colorScheme = colorScheme;
            LOG.info(`Color colorScheme initialized as ${stringifyWindowColorScheme(colorScheme)}`);
        }

    }

    private static _unInitialize () {

        const darkCallback = this._darkColorSchemeChangeCallback;
        if ( this._watchMediaDarkScheme !== undefined && darkCallback !== undefined ) {
            this._watchMediaDarkScheme.removeEventListener('change', darkCallback);
            this._watchMediaDarkScheme = undefined;
            this._darkColorSchemeChangeCallback = undefined;
        }

        this._colorScheme = undefined;

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
