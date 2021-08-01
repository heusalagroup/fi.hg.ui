import WindowService, {WindowServiceDestructor, WindowServiceEvent} from "./WindowService";
import Observer, {ObserverDestructor} from "../../ts/Observer";
import {ColorScheme, stringifyColorScheme} from "./types/ColorScheme";
import LogService from "../../ts/LogService";
import ThemeLocalStorageService, {
    ThemeLocalStorageServiceDestructor,
    ThemeLocalStorageServiceEvent
} from "./ThemeLocalStorageService";
import LocalStorageService from "./LocalStorageService";

const LOG = LogService.createLogger('ThemeService');

export enum ThemeServiceEvent {
    COLOR_SCHEME_CHANGED = "ThemeService:colorSchemeChanged"
}

export type ThemeServiceDestructor = ObserverDestructor;

export interface ThemeServiceColorSchemeChangedEventCallback {
    (event: ThemeServiceEvent.COLOR_SCHEME_CHANGED, scheme: ColorScheme) : void;
}

export class ThemeService {

    private static _observer               : Observer<ThemeServiceEvent> = new Observer<ThemeServiceEvent>("ThemeService");
    private static _colorScheme            : ColorScheme | undefined;
    private static _windowServiceListener  : WindowServiceDestructor | undefined;
    private static _storageServiceListener : ThemeLocalStorageServiceDestructor | undefined;


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
