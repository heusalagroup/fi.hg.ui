// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import RepositoryEntry from "./RepositoryEntry";
import PublicRepository from "./PublicRepository";

export interface Repository<T> extends PublicRepository<T> {

    findById (id: string): Promise<RepositoryEntry<T> | undefined>;

    getAll (): Promise<RepositoryEntry<T>[]>;
    getAllByFormId (id: string): Promise<RepositoryEntry<T>[]>;

    createItem (data: T): Promise<RepositoryEntry<T>>;

    update (id: string, data: T): Promise<RepositoryEntry<T>>;

    deleteById (id: string): Promise<RepositoryEntry<T>>;

}

export default Repository;
