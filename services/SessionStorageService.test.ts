// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

import SessionStorageService from "./SessionStorageService";

describe('SessionStorageService', () => {

    let storeMock : any;

    beforeAll(() => {

        storeMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            removeItem: jest.fn()
        };

        Object.defineProperty(window, 'sessionStorage', { value: storeMock });

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('.hasItem', () => {

        test('returns true for defined value', () => {
            storeMock.getItem.mockReturnValue(null).mockReturnValueOnce('bar');
            expect( SessionStorageService.hasItem('foo') ).toBe(true);
        });

        test('returns false for non-defined values', () => {
            storeMock.getItem.mockReturnValue(null);
            expect( SessionStorageService.hasItem('foo') ).toBe(false);
        });

    });

    describe('.getItem', () => {

        test('returns the value for defined value', () => {
            storeMock.getItem.mockReturnValue(null).mockReturnValueOnce('bar');
            expect( SessionStorageService.getItem('foo') ).toBe('bar');
        });

        test('returns null for non-defined values', () => {
            storeMock.getItem.mockReturnValue(null);
            expect( SessionStorageService.getItem('foo') ).toBeNull();
        });

    });

    describe('.removeItem', () => {

        test('calls window.sessionStorage.removeItem', () => {

            expect( storeMock.removeItem ).not.toHaveBeenCalled();
            SessionStorageService.removeItem('foo');
            expect( storeMock.removeItem ).toHaveBeenCalledTimes(1);

        });

        test('returns itself for chaining', () => {
            expect( SessionStorageService.removeItem('foo') ).toBe(SessionStorageService);
        });

    });

    describe('.setItem', () => {

        test('calls window.sessionStorage.setItem', () => {

            expect( storeMock.setItem ).not.toHaveBeenCalled();
            SessionStorageService.setItem('foo', 'bar');
            expect( storeMock.setItem ).toHaveBeenCalledTimes(1);
            expect( storeMock.setItem.mock.calls[0][0] ).toBe('foo');
            expect( storeMock.setItem.mock.calls[0][1] ).toBe('bar');

        });

        test('returns itself for chaining', () => {
            expect( SessionStorageService.setItem('foo', 'bar') ).toBe(SessionStorageService);
        });

    });

    describe('.removeAllItems', () => {

        test('calls window.sessionStorage.clear()', () => {
            expect( storeMock.clear ).not.toHaveBeenCalled();
            SessionStorageService.removeAllItems();
            expect( storeMock.clear ).toHaveBeenCalledTimes(1);
        });

        test('returns itself for chaining', () => {
            expect( SessionStorageService.removeAllItems() ).toBe(SessionStorageService);
        });

    });

});
