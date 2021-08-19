// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import RepositoryEntry from "./RepositoryEntry";

export interface Repository<T> {

    getAll (): Promise<RepositoryEntry<T>[]>;

    createForm (data: T): Promise<RepositoryEntry<T>>;

    findById (id: string): Promise<RepositoryEntry<T> | undefined>;

    update (id: string, data: T): Promise<RepositoryEntry<T>>;

    deleteById (id: string): Promise<void>;

}

export default Repository;
