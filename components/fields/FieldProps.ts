
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export interface FieldChangeCallback<T> {
    (value: T): void;
}

export interface FieldProps<T, ValueT> {

    className   ?: string;
    label       ?: string;
    placeholder ?: string;
    model       ?: T;

    value       ?: ValueT;

    change      ?: FieldChangeCallback<ValueT | undefined>;

}

export default FieldProps;
