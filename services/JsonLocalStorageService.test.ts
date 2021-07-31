import JsonLocalStorageService from "./JsonLocalStorageService";
import LocalStorageService from "./LocalStorageService";
import SpyInstance = jest.SpyInstance;

describe('JsonLocalStorageService', () => {

    let storeMock : {
        hasItem        : SpyInstance,
        getItem        : SpyInstance,
        removeItem     : SpyInstance,
        setItem        : SpyInstance,
        removeAllItems : SpyInstance,
    };

    beforeAll(() => {

        storeMock = {
            hasItem        : jest.spyOn(LocalStorageService, 'hasItem'),
            getItem        : jest.spyOn(LocalStorageService, 'getItem'),
            removeItem     : jest.spyOn(LocalStorageService, 'removeItem'),
            setItem        : jest.spyOn(LocalStorageService, 'setItem'),
            removeAllItems : jest.spyOn(LocalStorageService, 'removeAllItems')
        };

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('.hasItem', () => {

        test('returns true for defined value', () => {
            storeMock.hasItem.mockReturnValue(false).mockReturnValueOnce(true);
            expect( JsonLocalStorageService.hasItem('foo') ).toBe(true);
        });

        test('returns false for non-defined values', () => {
            storeMock.hasItem.mockReturnValue(false);
            expect( JsonLocalStorageService.hasItem('foo') ).toBe(false);
        });

    });

    describe('.getItem', () => {

        test('returns the parsed value for defined JSON value', () => {
            storeMock.getItem.mockReturnValue(null).mockReturnValueOnce('"bar"');
            expect( JsonLocalStorageService.getItem('foo') ).toBe('bar');
        });

        test('returns null for non-defined values', () => {
            storeMock.getItem.mockReturnValue(null);
            expect( JsonLocalStorageService.getItem('foo') ).toBeNull();
        });

    });

    describe('.removeItem', () => {

        test('calls window.localStorage.removeItem', () => {
            expect( storeMock.removeItem ).not.toHaveBeenCalled();
            JsonLocalStorageService.removeItem('foo');
            expect( storeMock.removeItem ).toHaveBeenCalledTimes(1);
        });

        test('returns itself for chaining', () => {
            expect( JsonLocalStorageService.removeItem('foo') ).toBe(JsonLocalStorageService);
        });

    });

    describe('.setItem', () => {

        test('calls window.localStorage.setItem', () => {

            expect( storeMock.setItem ).not.toHaveBeenCalled();
            JsonLocalStorageService.setItem('foo', 'bar');
            expect( storeMock.setItem ).toHaveBeenCalledTimes(1);
            expect( storeMock.setItem.mock.calls[0][0] ).toBe('foo');
            expect( storeMock.setItem.mock.calls[0][1] ).toBe('"bar"');

        });

        test('returns itself for chaining', () => {
            expect( JsonLocalStorageService.setItem('foo', 'bar') ).toBe(JsonLocalStorageService);
        });

    });

    describe('.removeAllItems', () => {

        test('calls window.localStorage.clear()', () => {
            expect( storeMock.removeAllItems ).not.toHaveBeenCalled();
            JsonLocalStorageService.removeAllItems();
            expect( storeMock.removeAllItems ).toHaveBeenCalledTimes(1);
        });

        test('returns itself for chaining', () => {
            expect( JsonLocalStorageService.removeAllItems() ).toBe(JsonLocalStorageService);
        });

    });

});
