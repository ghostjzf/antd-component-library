import React from 'react';
import { FormInstance, FormProps, FormItemProps } from 'antd/lib/form';

// declare const ModeTypes: ['edit', 'update', 'read'];
// 表单项的模式
export declare type FieldModeType = 'edit' | 'update' | 'read';

// 表单项静态显示
export type TextType = React.ReactNode | string;

// FieldCommon
export interface FieldCommonProps {
    mode: FieldModeType;
    text: TextType;
    children?: React.ReactNode;
}

export type hideDataType = { getFieldValue };

export interface FormOptionsProps extends Omit<FormItemProps, 'initialValue'> {
    span?: number;
    hide?: boolean | ((data: hideDataType) => boolean);
}

export interface formProps extends FormProps {
    options: FormOptionsProps[];
    searchText?: string;
    resetText?: string;
    beforeSubmit?: (params: any) => any;
    form: FormInstance;
    searchRender?: () => React.ReactNode;
}

export interface BaseFormProps extends FormProps {
    onSubmit?: (params: any) => any;
    onReset?: () => any;
    options: FormOptionsProps[];
    searchText?: string;
    resetText?: string;
    beforeSubmit?: (params: any) => any;
    searchRender?: () => React.ReactNode;
    form: FormInstance;
}
