// Copyright (c) 2021-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import WindowService, {WindowServiceDestructor, WindowServiceEvent} from "./WindowService";
import Observer, {ObserverDestructor} from "../../ts/Observer";
import {ColorScheme, isColorScheme, stringifyColorScheme} from "./types/ColorScheme";
import LogService from "../../ts/LogService";
import ThemeLocalStorageService, {
    ThemeLocalStorageServiceDestructor,
    ThemeLocalStorageServiceEvent
} from "./ThemeLocalStorageService";
import WindowEventService, {
    WindowEventServiceDestructor,
    WindowEventServiceEvent,
    WindowServiceEventTargetObject
} from "./WindowEventService";
import {JsonObject} from "../../ts/Json";

const LOG = LogService.createLogger('ThemeService');

export enum ThemeServiceEvent {
    COLOR_SCHEME_CHANGED = "ThemeService:colorSchemeChanged"
}

export type ThemeServiceDestructor = ObserverDestructor;

export interface ThemeServiceColorSchemeChangedEventCallback {
    (event: ThemeServiceEvent.COLOR_SCHEME_CHANGED, scheme: ColorScheme) : void;
}

export enum ThemeServiceMessageType {
    COLOR_SCHEME_CHANGED = "fi.nor.ui.ThemeService:colorSchemeChanged"
}

export interface ThemeChangeMessageDTO {
    readonly type  : ThemeServiceMessageType.COLOR_SCHEME_CHANGED;
    readonly value : ColorScheme | undefined;
}

export function isThemeChangeMessageDTO (value : any) : value is ThemeChangeMessageDTO {
    return (
        !!value
        && value?.type === ThemeServiceMessageType.COLOR_SCHEME_CHANGED
        && ( value?.value === undefined || isColorScheme(value?.value) )
    );
}

export class ThemeService {

    private static _observer                   : Observer<ThemeServiceEvent> = new Observer<ThemeServiceEvent>("ThemeService");
    private static _colorScheme                : ColorScheme | undefined;
    private static _windowServiceListener      : WindowServiceDestructor | undefined;
    private static _storageServiceListener     : ThemeLocalStorageServiceDestructor | undefined;
    private static _windowEventServiceListener : WindowEventServiceDestructor | undefined;


    public static Event = ThemeServiceEvent;

    public static hasDarkMode () : boolean {
        return this.getColorScheme() === ColorScheme.DARK;
    }

    public static hasLightMode () : boolean {
        return this.getColorScheme() === ColorScheme.LIGHT;
    }

    public static getColorScheme () : ColorScheme {
        return this._colorScheme ?? ThemeLocalStorageService.getColorScheme() ?? WindowService.getColorScheme();
    }

    public static setColorScheme (value: ColorScheme | undefined) : ThemeService {

        if (this._colorScheme !== value) {

            this._colorScheme = value;

            if (ThemeLocalStorageService.getColorScheme() !== value) {
                ThemeLocalStorageService.setColorScheme(value);
            }

            if (this._observer.hasCallbacks(ThemeServiceEvent.COLOR_SCHEME_CHANGED)) {
                if (value === undefined) {
                    this._observer.triggerEvent(ThemeServiceEvent.COLOR_SCHEME_CHANGED, WindowService.getColorScheme());
                } else {
                    this._observer.triggerEvent(ThemeServiceEvent.COLOR_SCHEME_CHANGED, value);
                }
            }

            LOG.debug(`Color scheme changed by user as ${this._colorScheme ? stringifyColorScheme(this._colorScheme) : 'default'}`);

        }

        return this;
    }

    public static on (eventName: ThemeServiceEvent.COLOR_SCHEME_CHANGED, callback: ThemeServiceColorSchemeChangedEventCallback) : ThemeServiceDestructor;

    // Implementation
    public static on (
        name     : ThemeServiceEvent.COLOR_SCHEME_CHANGED,
        callback : ThemeServiceColorSchemeChangedEventCallback
    ) : ThemeServiceDestructor {

        if (name === ThemeServiceEvent.COLOR_SCHEME_CHANGED) {

            if (this._colorScheme === undefined) {
                this._startWindowServiceListener();
                this._startLocalStorageListener();
                this._startWindowEventServiceListener();
            }

            let destructor : any = this._observer.listenEvent(name, callback);

            return () => {
                try {
                    destructor();
                    destructor = undefined;
                } finally {
                    if (!this._observer.hasCallbacks(ThemeServiceEvent.COLOR_SCHEME_CHANGED)) {
                        this._removeWindowServiceListener();
                        this._removeLocalStorageListener();
                        this._removeWindowEventServiceListener();
                    }
                }
            };

        } else {
            throw new TypeError(`ThemeService: Unsupported event name: ${name}`);
        }

    }

    public static destroy () {

        this._removeWindowServiceListener();
        this._removeLocalStorageListener();
        this._colorScheme = undefined;

    }

    /**
     * Sends a message to set color scheme on remote target.
     *
     * This should be something that can receive events.
     *
     * @param target This should be the object from `window.open()` or `window.opener()` or `HTMLIFrameElement.contentWindow` or `window.parent`, etc
     * @param value The color schema to use. If you specify 'undefined' the user defined value will be removed (eg. browser's choice will be active then).
     * @param origin Optional origin. Generally it's unsafe to use '*' but dark/light theme value is not very big secret.
     */
    public static setRemoteColorScheme (
        value  : ColorScheme | undefined,
        target : WindowServiceEventTargetObject,
        origin : string = '*'
    ) {

        const message : ThemeChangeMessageDTO = {
            type: ThemeServiceMessageType.COLOR_SCHEME_CHANGED,
            value: value
        };

        const messageString = JSON.stringify(message);

        target.postMessage(messageString, origin);

    }

    /**
     * Sends a message to remove a color scheme from remote target.
     *
     * This should be something that can receive events.
     *
     * @param target This should be the object from `window.open()` or `window.opener()` or `HTMLIFrameElement.contentWindow` or `window.parent`, etc
     * @param origin Optional origin. Generally it's unsafe to use '*' but dark/light theme value is not very big secret.
     */
    public static unsetRemoteColorScheme (
        target : WindowServiceEventTargetObject,
        origin : string = '*'
    ) {
        return this.setRemoteColorScheme(undefined, target, origin);
    }

    private static _startWindowEventServiceListener () {

        this._windowEventServiceListener = WindowEventService.on(
            WindowEventService.Event.JSON_MESSAGE,
            (event: WindowEventServiceEvent.JSON_MESSAGE, message: JsonObject) => {
                if (this._observer.hasCallbacks(ThemeServiceEvent.COLOR_SCHEME_CHANGED)) {
                    if (isThemeChangeMessageDTO(message)) {
                        LOG.debug(`Color scheme changed through a message as ${stringifyColorScheme(message.value)}`);
                        this.setColorScheme(message.value);
                    }
                } else {
                    LOG.warn(`Warning! We are listening events for browser color scheme when we don't have our own listeners.`);
                }
            }
        );

    }

    private static _removeWindowEventServiceListener () {

        if (this._windowEventServiceListener) {
            this._windowEventServiceListener();
            this._windowEventServiceListener = undefined;
        }

    }


    private static _startWindowServiceListener () {

        this._windowServiceListener = WindowService.on(
            WindowService.Event.COLOR_SCHEME_CHANGED,
            (event: WindowServiceEvent, colorScheme: ColorScheme) => {
                if (this._observer.hasCallbacks(ThemeServiceEvent.COLOR_SCHEME_CHANGED)) {
                    if (this._colorScheme === undefined) {
                        LOG.debug(`Browser color scheme changed as ${stringifyColorScheme(WindowService.getColorScheme())}`);
                        this._observer.triggerEvent(ThemeServiceEvent.COLOR_SCHEME_CHANGED, colorScheme);
                    } else {
                        LOG.warn(`Warning! We are listening events for browser color scheme when we already have our own state.`);
                    }
                } else {
                    LOG.warn(`Warning! We are listening events for browser color scheme when we don't have our own listeners.`);
                }
            }
        );

    }

    private static _removeWindowServiceListener () {

        if (this._windowServiceListener) {
            this._windowServiceListener();
            this._windowServiceListener = undefined;
        }

    }


    private static _startLocalStorageListener () {

        this._storageServiceListener = ThemeLocalStorageService.on(
            ThemeLocalStorageServiceEvent.COLOR_SCHEME_CHANGED,
            (event: ThemeLocalStorageServiceEvent.COLOR_SCHEME_CHANGED) => {
                if (this._observer.hasCallbacks(ThemeServiceEvent.COLOR_SCHEME_CHANGED)) {
                    if (this._colorScheme === undefined) {
                        LOG.debug(`Local storage color scheme changed as ${stringifyColorScheme(ThemeLocalStorageService.getColorScheme())}`);
                        this._observer.triggerEvent(ThemeServiceEvent.COLOR_SCHEME_CHANGED, this.getColorScheme());
                    } else {
                        LOG.warn(`Warning! We are listening events for local storage color scheme when we already have our own state.`);
                    }
                } else {
                    LOG.warn(`Warning! We are listening events for local storage color scheme when we don't have our own listeners.`);
                }
            }
        );

    }

    private static _removeLocalStorageListener () {

        if (this._storageServiceListener) {
            this._storageServiceListener();
            this._storageServiceListener = undefined;
        }

    }

}

export default ThemeService;
