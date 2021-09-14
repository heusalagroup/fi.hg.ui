
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export interface FieldChangeCallback<T> {
    (value: T): void;
}

export interface FieldProps<T, ValueT> {

    readonly className   ?: string;
    readonly label       ?: string;
    readonly placeholder ?: string;
    readonly model       ?: T;
    readonly value       ?: ValueT;
    readonly change      ?: FieldChangeCallback<ValueT | undefined>;

}

export default FieldProps;
