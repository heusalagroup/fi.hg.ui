// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export interface RepositoryEntry<T> {
    readonly data    : T;
    readonly id      : string;
    readonly version : number;
}

export default RepositoryEntry;
