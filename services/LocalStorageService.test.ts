// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

import LocalStorageService from "./LocalStorageService";

describe('LocalStorageService', () => {

    let storeMock : any;

    beforeAll(() => {

        storeMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            removeItem: jest.fn()
        };

        Object.defineProperty(window, 'localStorage', { value: storeMock });

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('.hasItem', () => {

        test('returns true for defined value', () => {
            storeMock.getItem.mockReturnValue(null).mockReturnValueOnce('bar');
            expect( LocalStorageService.hasItem('foo') ).toBe(true);
        });

        test('returns false for non-defined values', () => {
            storeMock.getItem.mockReturnValue(null);
            expect( LocalStorageService.hasItem('foo') ).toBe(false);
        });

    });

    describe('.getItem', () => {

        test('returns the value for defined value', () => {
            storeMock.getItem.mockReturnValue(null).mockReturnValueOnce('bar');
            expect( LocalStorageService.getItem('foo') ).toBe('bar');
        });

        test('returns null for non-defined values', () => {
            storeMock.getItem.mockReturnValue(null);
            expect( LocalStorageService.getItem('foo') ).toBeNull();
        });

    });

    describe('.removeItem', () => {

        test('calls window.localStorage.removeItem', () => {
            expect( storeMock.removeItem ).not.toHaveBeenCalled();
            LocalStorageService.removeItem('foo');
            expect( storeMock.removeItem ).toHaveBeenCalledTimes(1);
        });

        test('returns itself for chaining', () => {
            expect( LocalStorageService.removeItem('foo') ).toBe(LocalStorageService);
        });

    });

    describe('.setItem', () => {

        test('calls window.localStorage.setItem', () => {

            expect( storeMock.setItem ).not.toHaveBeenCalled();
            LocalStorageService.setItem('foo', 'bar');
            expect( storeMock.setItem ).toHaveBeenCalledTimes(1);
            expect( storeMock.setItem.mock.calls[0][0] ).toBe('foo');
            expect( storeMock.setItem.mock.calls[0][1] ).toBe('bar');

        });

        test('returns itself for chaining', () => {
            expect( LocalStorageService.setItem('foo', 'bar') ).toBe(LocalStorageService);
        });

    });

    describe('.removeAllItems', () => {

        test('calls window.localStorage.clear()', () => {
            expect( storeMock.clear ).not.toHaveBeenCalled();
            LocalStorageService.removeAllItems();
            expect( storeMock.clear ).toHaveBeenCalledTimes(1);
        });

        test('returns itself for chaining', () => {
            expect( LocalStorageService.removeAllItems() ).toBe(LocalStorageService);
        });

    });

});
