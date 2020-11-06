import React, { useContext } from 'react';
import { Form, Button, Space, Col } from 'antd';
import FieldBuild from './FieldBuild';
import { BaseFormProps } from '../types/form.type';
import Container from '../layout';
import { ConfigContext } from '../../ConfigProvider';
import { useIntl } from '../locale';

const BaseForm: React.FC<BaseFormProps> = props => {
    const { onSubmit, onReset, form, options, searchText, resetText, beforeSubmit, searchRender, ...restProps } = props;
    const { locale } = useContext(ConfigContext);
    const { Intl } = useIntl(locale);

    const content = options.map((item, index) => {
        return <FieldBuild key={index} {...item} />;
    });

    const onFinish = values => {
        if (typeof beforeSubmit === 'function') {
            const params = beforeSubmit(values);

            onSubmit && onSubmit(params);
        } else {
            onSubmit && onSubmit(values);
        }
    };

    const handleReset = () => {
        form.resetFields();

        onReset && onReset();
    };

    const renderSearch = () => {
        if (typeof searchRender === 'function') {
            return (
                <Col>
                    <Form.Item>{searchRender()}</Form.Item>
                </Col>
            );
        }

        return (
            <Col>
                <Form.Item>
                    <Space size="small">
                        <Button type="primary" htmlType="submit">
                            {searchText || Intl.getMessage('form.search', '查询')}
                        </Button>
                        <Button htmlType="button" onClick={handleReset}>
                            {resetText || Intl.getMessage('form.reset', '重置')}
                        </Button>
                    </Space>
                </Form.Item>
            </Col>
        );
    };

    return (
        <Form layout="inline" {...restProps} form={form} onFinish={onFinish}>
            <Container>
                {content}
                {renderSearch()}
            </Container>
        </Form>
    );
};

export default BaseForm;
