// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import RepositoryEntry from "./RepositoryEntry";

export interface PublicRepository<T> {

    findById (id: string): Promise<RepositoryEntry<T> | undefined>;

}

export default PublicRepository;
