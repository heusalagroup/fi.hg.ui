// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import FormDTO from "./FormDTO";
import { RepositoryEntry } from "./RepositoryEntry";

export interface FormListResponseDTO {
    readonly payload: RepositoryEntry<FormDTO>[];
}

export default FormListResponseDTO;
