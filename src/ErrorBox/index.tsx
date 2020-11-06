import React, { Component } from 'react';
import { FrownFilled } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { ConfigConsumer } from '../ConfigProvider';
import './style.less';

export interface ErrorBoxProps {
    title?: string;
    error?: any;
    onClick?(): void;
}

class ErrorBox extends Component<ErrorBoxProps> {
    render() {
        const { title, error } = this.props;
        const msg = error instanceof Error ? error.message : error;

        return (
            <ConfigConsumer>
                {({ prefix }) => {
                    return (
                        <div className={`${prefix}-error-box`}>
                            <FrownFilled />
                            {title && <h4 className={`${prefix}-error-box-title`}>{title}</h4>}
                            <div className={`${prefix}-error-box-msg`}>
                                <Typography.Text mark>{msg}</Typography.Text>
                            </div>
                            {this.props.onClick && (
                                <Button
                                    className={`${prefix}-error-box-btn`}
                                    type="primary"
                                    onClick={this.props.onClick}>
                                    Retry
                                </Button>
                            )}
                        </div>
                    );
                }}
            </ConfigConsumer>
        );
    }
}

export default ErrorBox;
