// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

export interface UsageResponseDTO {
    readonly path: string;
    readonly methods: string[];
    readonly params?: {[key: string]: string};
    readonly headers?: {[key: string]: string};
    readonly subResources?: UsageResponseDTO[];
}

export default UsageResponseDTO;
