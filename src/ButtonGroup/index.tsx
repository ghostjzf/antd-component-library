import React, { FC } from 'react';
import { Button, Dropdown, Menu, Modal, Row, Col } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';
import { DownOutlined } from '@ant-design/icons';

export declare type BtnsProps = ButtonProps & {
    confirmText?: string; // 二次确认文案
    hidden?: boolean; // 是否隐藏
};

export interface ButtonGroupProps {
    count?: number; // 展示个数，其余包裹在下拉中
    moreText?: string; // 下拉按钮文案
    dropDownBtnProps?: any; // 下拉按钮配置
    btns: BtnsProps[]; // 按钮组
}

const style = { margin: '0 8px 8px 0' };

const ButtonGroup: FC<ButtonGroupProps> = props => {
    const { count, moreText, dropDownBtnProps, btns } = props;
    const notHideBtns = btns.map((item, index) => ({ ...item, key: index })).filter(item => !item.hidden);
    const displayBtns = notHideBtns.slice(0, Math.min(count as number, notHideBtns.length));
    const dropdownBtns = notHideBtns.length > (count as number) ? notHideBtns.slice(count) : [];

    const handleClick = (btn, e) => {
        const { confirmText, onClick } = btn;

        if (confirmText) {
            Modal.confirm({
                title: confirmText,
                onOk: () => onClick(e)
            });

            return;
        }

        onClick(e);
    };

    const dropdownOverlay = (
        <Menu>
            {dropdownBtns.map(btn => {
                const { children, key, ...props } = btn;

                return (
                    <Menu.Item className="Item" key={key}>
                        <Button {...props} type="link" onClick={e => handleClick(btn, e)}>
                            {children}
                        </Button>
                    </Menu.Item>
                );
            })}
        </Menu>
    );

    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col>
                {displayBtns.map((btn, index) => {
                    const { children, key, ...props } = btn;

                    return (
                        <Button key={key} {...props} style={style} onClick={e => handleClick(btn, e)}>
                            {children}
                        </Button>
                    );
                })}

                {!!dropdownBtns.length && (
                    <Dropdown overlay={dropdownOverlay} trigger={['click']}>
                        <Button type="link" size="middle" {...dropDownBtnProps}>
                            {moreText} <DownOutlined />
                        </Button>
                    </Dropdown>
                )}
            </Col>
        </Row>
    );
};

ButtonGroup.defaultProps = {
    count: 3,
    moreText: 'more'
};

export default ButtonGroup;
