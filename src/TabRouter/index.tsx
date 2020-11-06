import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Location } from 'history';
import Nav from './Nav';
import Show from './Show';
import { MenuItem as _MenuItem, ModeTypes } from './type';
import { ConfigConsumer } from '../ConfigProvider';
import Tip from './Tip';

import './style.less';

const { Sider, Content } = Layout;

export declare type MenuItem = _MenuItem; // 解决Export was Not Found问题

export interface TabRouterProps {
    location?: Location;
    menus: MenuItem[];
    mode?: ModeTypes;
    hasCollaps?: boolean;
}

function getHasPermissionItem(item) {
    const { hasPermission } = item;

    if (hasPermission === undefined || hasPermission === null) {
        return item.component;
    } else if (typeof hasPermission === 'boolean') {
        return item.hasPermission ? item.component : Tip;
    } else if (typeof hasPermission === 'function') {
        return item.hasPermission() ? item.component : Tip;
    }

    return null;
}

function transform(menus) {
    return menus.map(item => {
        return {
            ...item,
            component: item.component ? getHasPermissionItem(item) : null
        };
    });
}

class TabRouter extends Component<TabRouterProps> {
    state = {
        collapsed: false
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        const { mode = 'horizontal', hasCollaps = false, menus } = this.props;
        const { collapsed } = this.state;
        const menusList = transform(menus);

        return (
            <ConfigConsumer>
                {({ prefix }) => {
                    return (
                        <div className={`${prefix}-tab-router`}>
                            <Layout>
                                {['vertical', 'inline'].includes(mode) && (
                                    <Sider theme="light" collapsed={collapsed}>
                                        <>
                                            {hasCollaps && (
                                                <Button
                                                    className={`${prefix}-tab-router-collaps-button`}
                                                    type="primary"
                                                    size="small"
                                                    onClick={this.toggleCollapsed}>
                                                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                                </Button>
                                            )}
                                            <Nav menus={menusList} mode={mode} prefix="jigsaw" />
                                        </>
                                    </Sider>
                                )}
                                <Content>
                                    {mode === 'horizontal' && <Nav menus={menusList} mode={mode} prefix={prefix} />}
                                    <Show location={this.props.location} menus={menusList} />
                                </Content>
                            </Layout>
                        </div>
                    );
                }}
            </ConfigConsumer>
        );
    }
}

export default TabRouter;
