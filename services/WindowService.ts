// Copyright (c) 2021 Sendanor. All rights reserved.

import Observer, {ObserverCallback, ObserverDestructor} from "../../ts/Observer";

export enum WindowColorScheme {
    DARK,
    LIGHT
}

export enum WindowServiceEvent {

    DARK_MODE_CHANGED = "WindowServiceEvent:darkModeChanged"

}

export interface DarkModeEventCallback {
    (event: WindowServiceEvent, scheme: WindowColorScheme) : void;
}

export class WindowService {

    private static _observer : Observer<WindowServiceEvent> = new Observer<WindowServiceEvent>("FooService");
    private static _watchMediaDarkScheme : MediaQueryList | undefined;

    public static Event = WindowServiceEvent;

    public static on (name : WindowServiceEvent, callback: ObserverCallback<WindowServiceEvent>) : ObserverDestructor {

        if (name === WindowServiceEvent.DARK_MODE_CHANGED) {

            if (!this._isInitialized()) {
                this._initialize();
            }

            const destructor = this._observer.listenEvent(name, callback);

            return () => {
                try {
                    destructor();
                } finally {
                    if (!this._observer.hasCallbacks(WindowServiceEvent.DARK_MODE_CHANGED)) {
                        this._unInitialize();
                    }
                }
            };

        } else {

            return this._observer.listenEvent(name, callback);

        }

    }

    public static isDarkModeEnabled () : boolean {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    public static getColorScheme () : WindowColorScheme {
        return this.isDarkModeEnabled() ? WindowColorScheme.DARK : WindowColorScheme.LIGHT;
    }


    private static _isInitialized () : boolean {
        return !!this._watchMediaDarkScheme;
    }

    private static _initialize () {

        if (this._watchMediaDarkScheme) {
            WindowService._unInitialize();
        }

        this._watchMediaDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        this._watchMediaDarkScheme.addEventListener('change', WindowService._onColorSchemeChange);

    }

    private static _unInitialize () {

        if (this._watchMediaDarkScheme !== undefined) {
            this._watchMediaDarkScheme.removeEventListener('change', WindowService._onColorSchemeChange);
            this._watchMediaDarkScheme = undefined;
        }

    }

    private static _onColorSchemeChange (e : MediaQueryListEvent) {
        const newColorScheme : WindowColorScheme = e.matches ? WindowColorScheme.DARK : WindowColorScheme.LIGHT;
        this._observer.triggerEvent(WindowServiceEvent.DARK_MODE_CHANGED, newColorScheme);
    }

}

export default WindowService;
