// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import FormDTO from "./FormDTO";

export interface FormResponseDTO {
    readonly id       : string;
    readonly version  : number;
    readonly payload  : FormDTO;
}

export default FormResponseDTO;
