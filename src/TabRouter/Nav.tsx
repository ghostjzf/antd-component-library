import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink, withRouter, RouteComponentProps, matchPath } from 'react-router-dom';
import { MenuItem, ModeTypes } from './type';

declare type NavMenuItem = Omit<MenuItem, 'component'>;
declare type FilteredNavMenuItem = Omit<MenuItem, 'component' | 'hidden'>;

interface NavProps extends RouteComponentProps {
    menus: NavMenuItem[];
    mode?: ModeTypes;
    prefix: string;
}

class Nav extends Component<NavProps> {
    getSelectedKeys = () => {
        const selectedKeys = [] as string[];
        const matchMenu = this.props.menus.find(item =>
            item.path
                ? !!matchPath(this.props.location.pathname, {
                      path: item.path,
                      exact: item.exact
                  })
                : false
        );

        if (matchMenu) {
            selectedKeys.push(matchMenu.path);
        }

        return selectedKeys;
    };

    filterMenus = menus => {
        return menus.filter(item => {
            return !item.hidden;
        });
    };

    render() {
        const { menus, mode, prefix } = this.props;
        const selectedKeys = this.getSelectedKeys();
        const filteredMenus = this.filterMenus(menus) as FilteredNavMenuItem[];

        return (
            <Menu className={`${prefix}-tab-router-nav`} selectedKeys={selectedKeys} mode={mode}>
                {filteredMenus.map(item => (
                    <Menu.Item key={item.path} icon={item.icon}>
                        <NavLink className={`${prefix}-tab-router-nav-item`} to={item.path}>
                            {item.title}
                        </NavLink>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }
}

export default withRouter(Nav);
