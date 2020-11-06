import React from 'react';
import { Form, Col } from 'antd';
import { hideDataType } from '../types/form.type';

export interface FieldCreate {
    span?: number;
    $span?: number;
    hide?: boolean | ((data: hideDataType) => boolean | undefined);
}

const FieldBuild: React.FC<FieldCreate> = props => {
    const { children, $span, span, hide, ...formItemProps } = props;

    const colSpan = span && $span && span >= $span ? span : $span;

    function coverFormItemProps(name, value) {
        Object.assign(formItemProps, { [name]: value });
    }

    function renderHideFilter(getFieldValue) {
        if (hide === true) {
            return null;
        }

        if (typeof hide === 'function') {
            if (hide({ getFieldValue }) === true) {
                return null;
            }
        }

        return (
            <Col span={colSpan}>
                <Form.Item {...formItemProps}>{children}</Form.Item>
            </Col>
        );
    }

    if ((children as any)?.type?.displayName === 'Switch') {
        coverFormItemProps('valuePropName', 'checked');
    }

    if (formItemProps.hasOwnProperty('shouldUpdate') && (formItemProps as any).shouldUpdate) {
        return (
            <Form.Item noStyle shouldUpdate={(formItemProps as any).shouldUpdate}>
                {({ getFieldValue }) => {
                    return renderHideFilter(getFieldValue);
                }}
            </Form.Item>
        );
    }

    return (
        <Col span={colSpan}>
            <Form.Item {...formItemProps}>{children}</Form.Item>
        </Col>
    );
};

FieldBuild.displayName = 'FieldBuild';

export default FieldBuild;
