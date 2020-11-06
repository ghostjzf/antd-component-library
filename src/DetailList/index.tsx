import React, { FC, useState, useContext } from 'react';
import { Descriptions, Space, Row, Col, Button } from 'antd';
import { DescriptionsProps } from 'antd/lib/descriptions';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import { ConfigContext } from '../ConfigProvider';
import _ from 'lodash';

const { Item: DescItem } = Descriptions;

export declare type DetailListItem = {
    label: React.ReactNode;
    dataIndex?: string;
    render?: (text?: any) => React.ReactNode;
    emptyText?: string;
} & Omit<DescriptionsItemProps, 'label' | 'children'>;

export interface DetailListProps {
    items: DetailListItem[];
    dataSource: object | null;
    extra?: React.ReactNode;
    extraBtns?: React.ReactNode;
    okText?: string;
    cancelText?: string;
    onOk?: (closeModal?: Function, dismissModal?: Function) => void;
    btnPosition?: 'left' | 'middle' | 'right';
    className?: string;
    style?: React.CSSProperties;
    descProps?: DescriptionsProps;
    close?: (data?: any) => void;
    dismiss?: (data?: any) => void;
}

enum BtnPositon {
    left = 'start',
    middle = 'center',
    right = 'end'
}

enum OkText {
    zh_CN = '确定',
    zh_TW = '確定',
    en_US = 'Ok'
}

enum CancelText {
    zh_CN = '取消',
    zh_TW = '取消',
    en_US = 'Cancel'
}

let clickedOkBtn = false;

const DetailList: FC<DetailListProps> = (props: DetailListProps) => {
    const { prefix, locale } = useContext(ConfigContext);
    const [okLoading, setOkLoading] = useState(false);
    const {
        items,
        extra,
        extraBtns,
        dataSource,
        btnPosition = 'right',
        onOk,
        okText,
        cancelText,
        close,
        dismiss,
        className,
        style,
        descProps
    } = props;

    const handlePromiseOnOk = (returnValueOfOnOk?: PromiseLike<any>) => {
        if (!returnValueOfOnOk || !returnValueOfOnOk.then) {
            return;
        }

        setOkLoading(true);

        returnValueOfOnOk.then(
            () => {
                setOkLoading(false);
                clickedOkBtn = false;
            },
            (e: Error) => {
                // Emit error when catch promise reject
                console.error(e);
                setOkLoading(false);
                clickedOkBtn = false;
            }
        );
    };

    const handleOk = () => {
        if (clickedOkBtn) {
            return;
        }

        clickedOkBtn = true;

        if (!onOk) {
            close && close();

            return;
        }

        let returnValueOfOnOk;

        if (onOk.length && close) {
            returnValueOfOnOk = onOk(close, dismiss);
        } else {
            returnValueOfOnOk = onOk();
        }

        if (!returnValueOfOnOk) {
            close && close();

            return;
        }

        handlePromiseOnOk(returnValueOfOnOk);
    };

    const _className = className ? `${prefix}-detail-list ${className}` : `${prefix}-detail-list`;

    return (
        <div className={_className} style={style}>
            <Space direction="vertical">
                <Descriptions {...descProps}>
                    {items.map((item: DetailListItem, index) => {
                        const { label, span, dataIndex, render, emptyText = '--', ...restDescItemProps } = item;

                        const _renderContent = () => {
                            if (render) {
                                if (dataIndex) {
                                    return render(_.get(dataSource, dataIndex));
                                }

                                return render();
                            } else if (dataIndex) {
                                return _.get(dataSource, dataIndex, emptyText);
                            }
                        };

                        if (dataIndex || render) {
                            return (
                                <DescItem key={index} {...restDescItemProps} label={label} span={span}>
                                    {_renderContent()}
                                </DescItem>
                            );
                        }

                        return null;
                    })}
                </Descriptions>
                {extra}
                {onOk && (
                    <Row justify={BtnPositon[btnPosition]}>
                        <Col>
                            <Space>
                                {onOk && (
                                    <Button type="primary" onClick={handleOk} loading={okLoading}>
                                        {OkText[locale] || okText}
                                    </Button>
                                )}
                                {extraBtns}
                                {dismiss && (
                                    <Button onClick={() => dismiss()}>{CancelText[locale] || cancelText}</Button>
                                )}
                            </Space>
                        </Col>
                    </Row>
                )}
            </Space>
        </div>
    );
};

DetailList.defaultProps = {
    btnPosition: 'right'
};

export default DetailList;
