import crypto from "crypto";
import { filter, find, findIndex, map, remove } from "../../ts/modules/lodash";
import { RepositoryEntry } from "../types/RepositoryEntry";
import Repository from "../types/Repository";

export interface MemoryItem<T> {
    readonly id      : string;
    readonly version : number;
    readonly data    : T;
    readonly deleted : boolean;
}

export class MemoryRepository<T> implements Repository<T> {

    private readonly _items : MemoryItem<T>[];

    public constructor () {
        this._items = [];
    }

    public async getAll () : Promise<RepositoryEntry<T>[]> {
        return map(this._items, item => ({
            id       : item.id,
            version  : item.version,
            data     : item.data,
            deleted  : item.deleted
        }));
    }

    public async getAllByFormId (id: string): Promise<RepositoryEntry<T>[]> {
        function test (item: MemoryItem<T>) : boolean {
            // @ts-ignore
            return item?.data?.formId === id;
        }
        return map(
            filter(this._items, test),
            (item: MemoryItem<T>) : RepositoryEntry<T> => ({
                id       : item.id,
                version  : item.version,
                data     : item.data,
                deleted  : item.deleted
            })
        );
    }

    public async createItem (data: T) : Promise<RepositoryEntry<T>> {

        const id = MemoryRepository._createId();

        const existingItem = find(this._items, item => item.id === id);

        if (existingItem) throw new Error(`ID "${id}" was not unique`);

        const item : MemoryItem<T> = {
            id: MemoryRepository._createId(),
            version: 1,
            data: data,
            deleted: false
        };

        this._items.push(item);

        return {
            id      : item.id,
            version : item.version,
            data    : item.data,
            deleted : item.deleted
        };

    }

    public async findById (id: string) : Promise<RepositoryEntry<T> | undefined> {
        const item = find(this._items, form => form.id === id);
        if (item === undefined) return undefined;
        return {
            id      : item.id,
            version : item.version,
            data    : item.data,
            deleted : item.deleted
        };
    }

    public async update (id: string, data: T) : Promise<RepositoryEntry<T>> {

        const itemIndex = findIndex(this._items, item => item.id === id);
        if (itemIndex < 0) throw new TypeError(`No item found: #${id}`);

        const prevItem = this._items[itemIndex];

        const nextItem = {
            ...prevItem,
            version: prevItem.version + 1,
            data: data
        };

        this._items[itemIndex] = nextItem;

        return {
            id      : nextItem.id,
            version : nextItem.version,
            data    : nextItem.data,
            deleted : nextItem.deleted
        };

    }

    public async deleteById (id: string) : Promise<RepositoryEntry<T>> {

        const items = remove(this._items, item => item.id === id);
        const item  = items.shift();

        if (item === undefined) {
            throw new TypeError(`Could not find item: ${id}`);
        }

        return {
            id: item.id,
            data: item.data,
            version: item.version + 1,
            deleted: true
        };

    }


    private static _createId () : string {
        return crypto.randomBytes(20).toString('hex');
    }

}

export default MemoryRepository;
