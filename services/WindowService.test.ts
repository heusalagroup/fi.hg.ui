// Copyright (c) 2021 Sendanor. All rights reserved.

import {isFunction} from "../../ts/modules/lodash";
import WindowService, {
    DARK_COLOR_SCHEME_QUERY,
    isWindowColorScheme,
    parseWindowColorScheme,
    WindowColorScheme,
    WindowServiceDestructor,
    WindowServiceEvent
} from "./WindowService";
import LogService, {LogLevel} from "../../ts/LogService";
import SpyInstance = jest.SpyInstance;

describe('isWindowColorScheme', () => {

    test('returns true for correct values', () => {
        expect( isWindowColorScheme(WindowColorScheme.DARK) ).toBe(true);
        expect( isWindowColorScheme(WindowColorScheme.LIGHT) ).toBe(true);
    });

    test('returns false for incorrect values', () => {
        expect( isWindowColorScheme("DARK") ).toBe(false);
        expect( isWindowColorScheme("LIGHT") ).toBe(false);
        expect( isWindowColorScheme(-1) ).toBe(false);
        expect( isWindowColorScheme(999) ).toBe(false);
        expect( isWindowColorScheme(undefined) ).toBe(false);
        expect( isWindowColorScheme(null) ).toBe(false);
        expect( isWindowColorScheme(false) ).toBe(false);
        expect( isWindowColorScheme(true) ).toBe(false);
        expect( isWindowColorScheme({}) ).toBe(false);
        expect( isWindowColorScheme([]) ).toBe(false);
        expect( isWindowColorScheme(NaN) ).toBe(false);
    });

});

describe('parseWindowColorScheme', () => {

    test('can detect WindowColorScheme', () => {
        expect( parseWindowColorScheme(WindowColorScheme.DARK) ).toBe(WindowColorScheme.DARK);
        expect( parseWindowColorScheme(WindowColorScheme.LIGHT) ).toBe(WindowColorScheme.LIGHT);
    });

    test('can parse uppercase strings', () => {
        expect( parseWindowColorScheme("DARK") ).toBe(WindowColorScheme.DARK);
        expect( parseWindowColorScheme("LIGHT") ).toBe(WindowColorScheme.LIGHT);
    });

    test('can parse lowercase strings', () => {
        expect( parseWindowColorScheme("dark") ).toBe(WindowColorScheme.DARK);
        expect( parseWindowColorScheme("light") ).toBe(WindowColorScheme.LIGHT);
    });

    test('returns undefined for unknown values', () => {
        expect( parseWindowColorScheme("foo") ).toBe(undefined);
        expect( parseWindowColorScheme("") ).toBe(undefined);
        expect( parseWindowColorScheme(undefined) ).toBe(undefined);
        expect( parseWindowColorScheme(null) ).toBe(undefined);
        expect( parseWindowColorScheme(NaN) ).toBe(undefined);
        expect( parseWindowColorScheme(false) ).toBe(undefined);
        expect( parseWindowColorScheme(true) ).toBe(undefined);
        expect( parseWindowColorScheme({}) ).toBe(undefined);
        expect( parseWindowColorScheme([]) ).toBe(undefined);
    });

});

describe('WindowService', () => {

    let callback : SpyInstance | undefined;
    let listener : WindowServiceDestructor | undefined;

    let windowMatchMediaMock = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }));

    beforeAll( () => {

        LogService.setLogLevel(LogLevel.WARN);

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: windowMatchMediaMock
        });

    });

    afterEach(() => {

        if (listener) {
            listener();
            listener = undefined;
        }

        WindowService.destroy();

        windowMatchMediaMock.mockClear();

        jest.clearAllMocks();

    });

    describe('.Event', () => {

        test('is WindowServiceEvent', () => {
            expect(WindowService.Event).toStrictEqual(WindowServiceEvent);
        });

    });

    describe('.on', () => {

        test('does not call the callback before event is triggered', () => {

            expect(listener).toBe(undefined);

            callback = jest.fn();
            listener = WindowService.on(WindowServiceEvent.COLOR_SCHEME_CHANGED, callback as unknown as WindowServiceDestructor);
            expect( callback ).not.toHaveBeenCalled();

        });

        test('can listen COLOR_SCHEME_CHANGED event from light to dark', () => {

            expect(listener).toBe(undefined);

            callback = jest.fn();

            const matchMediaResultSpy = {
                matches: false,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResultSpy as unknown as MediaQueryList);

            listener = WindowService.on(WindowServiceEvent.COLOR_SCHEME_CHANGED, callback as unknown as WindowServiceDestructor);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);
            expect( windowMatchMediaMock.mock.calls[0][0] ).toBe(DARK_COLOR_SCHEME_QUERY);

            // @ts-ignore
            expect( matchMediaResultSpy.addEventListener ).toHaveBeenCalledTimes(1);
            expect( matchMediaResultSpy.addEventListener.mock.calls[0][0] ).toBe('change');

            const eventCallback = matchMediaResultSpy.addEventListener.mock.calls[0][1];
            expect( isFunction(eventCallback) ).toBe(true);

            expect( callback ).not.toHaveBeenCalled();

            eventCallback({matches: true});

            expect( callback ).toHaveBeenCalledTimes(1);
            expect( callback.mock.calls[0][0] ).toBe(WindowServiceEvent.COLOR_SCHEME_CHANGED);
            expect( callback.mock.calls[0][1] ).toBe(WindowColorScheme.DARK);

        });

        test('can listen COLOR_SCHEME_CHANGED event from dark to light', () => {

            expect(listener).toBe(undefined);

            callback = jest.fn();

            const matchMediaResultSpy = {
                matches: true,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResultSpy as unknown as MediaQueryList);

            listener = WindowService.on(WindowServiceEvent.COLOR_SCHEME_CHANGED, callback as unknown as WindowServiceDestructor);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);
            expect( windowMatchMediaMock.mock.calls[0][0] ).toBe(DARK_COLOR_SCHEME_QUERY);

            // @ts-ignore
            expect( matchMediaResultSpy.addEventListener ).toHaveBeenCalledTimes(1);
            expect( matchMediaResultSpy.addEventListener.mock.calls[0][0] ).toBe('change');

            const eventCallback = matchMediaResultSpy.addEventListener.mock.calls[0][1];
            expect( isFunction(eventCallback) ).toBe(true);

            expect( callback ).not.toHaveBeenCalled();

            eventCallback({matches: false});

            expect( callback ).toHaveBeenCalledTimes(1);
            expect( callback.mock.calls[0][0] ).toBe(WindowServiceEvent.COLOR_SCHEME_CHANGED);
            expect( callback.mock.calls[0][1] ).toBe(WindowColorScheme.LIGHT);

        });

        test('can uninstall listener from window object', () => {

            expect(listener).toBe(undefined);

            callback = jest.fn();

            const matchMediaResultSpy = {
                matches: true,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResultSpy as unknown as MediaQueryList);

            listener = WindowService.on(WindowServiceEvent.COLOR_SCHEME_CHANGED, callback as unknown as WindowServiceDestructor);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);
            expect( windowMatchMediaMock.mock.calls[0][0] ).toBe(DARK_COLOR_SCHEME_QUERY);

            expect( matchMediaResultSpy.addEventListener ).toHaveBeenCalledTimes(1);
            expect( matchMediaResultSpy.addEventListener.mock.calls[0][0] ).toBe('change');

            const eventCallback = matchMediaResultSpy.addEventListener.mock.calls[0][1];
            expect( isFunction(eventCallback) ).toBe(true);

            expect( callback ).not.toHaveBeenCalled();

            expect( matchMediaResultSpy.removeEventListener ).not.toHaveBeenCalled();

            listener();
            listener = undefined;

            expect( matchMediaResultSpy.removeEventListener ).toHaveBeenCalledTimes(1);
            expect( matchMediaResultSpy.removeEventListener.mock.calls[0][0] ).toBe('change');
            expect( matchMediaResultSpy.removeEventListener.mock.calls[0][1] ).toStrictEqual(eventCallback);

        });

    });

    describe('.getColorScheme', () => {

        test('returns LIGHT for light mode', () => {

            const matchMediaResult = {
                matches: false
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResult as unknown as MediaQueryList);

            expect( WindowService.getColorScheme() ).toStrictEqual(WindowColorScheme.LIGHT);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);

        });

        test('returns DARK for dark mode', () => {

            const matchMediaResult = {
                matches: true
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResult as unknown as MediaQueryList);

            expect( WindowService.getColorScheme() ).toStrictEqual(WindowColorScheme.DARK);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);

        });

        test('returns LIGHT after change event from dark to light', () => {

            expect(listener).toBe(undefined);

            callback = jest.fn();

            const matchMediaResultSpy = {
                matches: true,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResultSpy as unknown as MediaQueryList);

            listener = WindowService.on(WindowServiceEvent.COLOR_SCHEME_CHANGED, callback as unknown as WindowServiceDestructor);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);
            expect( windowMatchMediaMock.mock.calls[0][0] ).toBe(DARK_COLOR_SCHEME_QUERY);

            // @ts-ignore
            expect( matchMediaResultSpy.addEventListener ).toHaveBeenCalledTimes(1);
            expect( matchMediaResultSpy.addEventListener.mock.calls[0][0] ).toBe('change');

            const eventCallback = matchMediaResultSpy.addEventListener.mock.calls[0][1];
            expect( isFunction(eventCallback) ).toBe(true);

            expect( WindowService.getColorScheme() ).toBe(WindowColorScheme.DARK);

            eventCallback({matches: false});

            expect( WindowService.getColorScheme() ).toBe(WindowColorScheme.LIGHT);

        });

    });

    describe('.isDarkModeEnabled', () => {

        test('returns false for light mode', () => {

            const matchMediaResult = {
                matches: false
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResult as unknown as MediaQueryList);

            expect( WindowService.isDarkModeEnabled() ).toStrictEqual(false);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);

        });

        test('returns true for dark mode', () => {

            const matchMediaResult = {
                matches: true
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResult as unknown as MediaQueryList);

            expect( WindowService.isDarkModeEnabled() ).toStrictEqual(true);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);

        });

    });

    describe('.isLightModeEnabled', () => {

        test('returns false for dark mode', () => {

            const matchMediaResult = {
                matches: true
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResult as unknown as MediaQueryList);

            expect( WindowService.isLightModeEnabled() ).toStrictEqual(false);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);

        });

        test('returns true for light mode', () => {

            const matchMediaResult = {
                matches: false
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResult as unknown as MediaQueryList);

            expect( WindowService.isLightModeEnabled() ).toStrictEqual(true);

            expect( windowMatchMediaMock ).toHaveBeenCalledTimes(1);

        });

    });

    describe('.setColorScheme', () => {

        test('can change color scheme from LIGHT to DARK', () => {

            expect( WindowService.getColorScheme() ).toBe(WindowColorScheme.LIGHT);

            WindowService.setColorScheme(WindowColorScheme.DARK);

            expect( WindowService.getColorScheme() ).toBe(WindowColorScheme.DARK);

        });

        test('can change color scheme from DARK to LIGHT', () => {

            expect( WindowService.getColorScheme() ).toBe(WindowColorScheme.LIGHT);

            WindowService.setColorScheme(WindowColorScheme.DARK);

            expect( WindowService.getColorScheme() ).toBe(WindowColorScheme.DARK);

            WindowService.setColorScheme(WindowColorScheme.LIGHT);

            expect( WindowService.getColorScheme() ).toBe(WindowColorScheme.LIGHT);

        });

        test('does not trigger event callback if schema does not change', () => {

            expect(listener).toBe(undefined);

            callback = jest.fn();

            const matchMediaResultSpy = {
                matches: true,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
            };

            windowMatchMediaMock.mockReturnValue(matchMediaResultSpy as unknown as MediaQueryList);

            listener = WindowService.on(WindowServiceEvent.COLOR_SCHEME_CHANGED, callback as unknown as WindowServiceDestructor);

            expect( WindowService.getColorScheme() ).toBe(WindowColorScheme.DARK);

            WindowService.setColorScheme(WindowColorScheme.DARK);

            expect( WindowService.getColorScheme() ).toBe(WindowColorScheme.DARK);

            callback.mockClear();

            WindowService.setColorScheme(WindowColorScheme.DARK);

            expect( callback ).toHaveBeenCalledTimes(0);

        });

    });

});
