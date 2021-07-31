// Copyright (c) 2021 Sendanor. All rights reserved.

import {isFunction} from "../../ts/modules/lodash";
import WindowService, {
    DARK_COLOR_SCHEME_QUERY,
    WindowColorScheme,
    WindowServiceDestructor,
    WindowServiceEvent
} from "./WindowService";
import LogService, {LogLevel} from "../../ts/LogService";
import SpyInstance = jest.SpyInstance;

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
            callback = jest.fn();
            listener = WindowService.on(WindowServiceEvent.COLOR_SCHEME_CHANGED, callback as unknown as WindowServiceDestructor);
            expect( callback ).not.toHaveBeenCalled();
        });

        test('can listen COLOR_SCHEME_CHANGED event from light to dark', () => {

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

});
