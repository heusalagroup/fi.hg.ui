// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    map
} from "../../ts/modules/lodash";

import RepositoryEntry from "../../ts/simpleRepository/types/RepositoryEntry";
import ResponseListDTO from "../types/ResponseListDTO";
import ResponseDTO from "../types/ResponseDTO";

export class ResponseUtils {

    /**
     *
     * @param item
     * @__PURE__
     * @nosideeffects
     */
    public static convert_RepositoryEntry_to_ResponseDTO<T> (
        item: RepositoryEntry<T>
    ) : ResponseDTO<T> {

        const {
            data,
            id,
            version,
            deleted,
            members
        } = item;

        return {
            id,
            version,
            payload: data,
            deleted,
            members
        };

    }

    /**
     *
     * @param list
     * @__PURE__
     * @nosideeffects
     */
    public static convert_RepositoryEntryArray_to_ResponseListDTO<T> (
        list: RepositoryEntry<T>[]
    ) : ResponseListDTO<T> {

        return {
            payload: map(list, item => this.convert_RepositoryEntry_to_ResponseDTO(item))
        };

    }

}

export default ResponseUtils;
