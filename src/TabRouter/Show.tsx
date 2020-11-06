import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Location } from 'history';
import { MenuItem } from './type';

declare type ShowMenuItem = Omit<MenuItem, 'title' | 'hidden'>;

interface ShowProps {
    location?: Location;
    menus: ShowMenuItem[];
}

class Show extends Component<ShowProps> {
    render() {
        const { menus } = this.props;

        return menus.length ? (
            <Switch location={this.props.location}>
                {menus.map(item => (
                    <Route key={item.path} exact={item.exact} path={item.path} component={item.component} />
                ))}

                <Redirect to={this.props.menus[0].path} />
            </Switch>
        ) : null;
    }
}

export default Show;
