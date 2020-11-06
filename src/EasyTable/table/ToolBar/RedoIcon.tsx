import React, { useContext } from 'react';
import { Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import { ConfigContext } from '../../../ConfigProvider';
import { useIntl } from '../../locale';

const RedoIcon: React.FC<{
    spin: boolean;
    onClick?: () => void;
}> = props => {
    const { spin, onClick } = props;
    const { locale } = useContext(ConfigContext);
    const { Intl } = useIntl(locale);

    const onRedo = () => {
        onClick && onClick();
    };

    return (
        <Tooltip title={Intl.getMessage('toobar.reload', '刷新')}>
            <RedoOutlined spin={spin} onClick={onRedo} />
        </Tooltip>
    );
};

export default RedoIcon;
