import React, { useContext } from 'react';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Tooltip } from 'antd';
import { ConfigContext } from '../../../ConfigProvider';
import { useIntl } from '../../locale';

export type DensitySize = 'middle' | 'small' | 'large' | undefined;

export interface DensityIconProps<T = DensitySize> {
    size?: T;
    onSelect?: (size: T) => void;
}

const DensityIcon: React.FC<DensityIconProps> = props => {
    const { size = 'middle', onSelect } = props;
    const { prefix, locale } = useContext(ConfigContext);
    const { Intl } = useIntl(locale);

    return (
        <Dropdown
            overlay={
                <Menu
                    className={`${prefix}-density-menu`}
                    selectedKeys={[size]}
                    onClick={({ key }) => {
                        onSelect && onSelect(key as DensitySize);
                    }}>
                    <Menu.Item key="large">{Intl.getMessage('toolbar.default', '默认')}</Menu.Item>
                    <Menu.Item key="middle">{Intl.getMessage('toolbar.middle', '中等')}</Menu.Item>
                    <Menu.Item key="small">{Intl.getMessage('toolbar.small', '紧凑')}</Menu.Item>
                </Menu>
            }
            trigger={['click']}>
            <Tooltip title={Intl.getMessage('toolbar.density', '密度')}>
                <ColumnHeightOutlined />
            </Tooltip>
        </Dropdown>
    );
};

export default DensityIcon;
