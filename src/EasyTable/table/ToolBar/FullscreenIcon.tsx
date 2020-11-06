import React, { useEffect, useState, useContext } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { ConfigContext } from '../../../ConfigProvider';
import { useIntl } from '../../locale';

const FullScreenIcon = () => {
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const { prefix, locale } = useContext(ConfigContext);
    const { Intl } = useIntl(locale);

    useEffect(() => {
        const fullarea = document.getElementById(`${prefix}-easy-table`) as any;

        if (fullarea) {
            document.addEventListener(
                'keydown',
                function(e) {
                    if (e.which === 27 || e.keyCode === 27) {
                        fullarea.classList.remove('full-screen');
                        setFullscreen(false);
                    }
                },
                false
            );
        }
    }, []);

    const onExitFullScreen = () => {
        const fullarea = document.getElementById(`${prefix}-easy-table`) as any;

        if (fullarea) {
            fullarea.classList.remove('full-screen');
            setFullscreen(false);
        }
    };

    const onFullScreen = () => {
        const fullarea = document.getElementById(`${prefix}-easy-table`) as any;

        if (fullarea) {
            fullarea.classList.add('full-screen');
            setFullscreen(true);
        }
    };

    return (
        <Tooltip title={Intl.getMessage('toobar.fullscreen', '全屏')}>
            {fullscreen ? (
                <FullscreenExitOutlined onClick={onExitFullScreen} />
            ) : (
                <FullscreenOutlined onClick={onFullScreen} />
            )}
        </Tooltip>
    );
};

export default FullScreenIcon;
