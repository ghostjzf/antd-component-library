import React, { FC, useState, useEffect, useContext } from 'react';
import Modal from '@tiger/antd-modal';
import 'antd/lib/modal/style/index.css';
import '@tiger/antd-modal/modal.css';
import Preview from './Preview';
import { checkImgExists } from './utils';
import { ConfigContext } from '../ConfigProvider';
import './style.less';

export interface PhotoViewProps {
    src: string; // 图片地址
    name?: string; // 图片名称
    mode?: 'modal' | 'blank'; // 预览模式 默认为modal
    downloadable?: boolean; // 是否可下载 默认为true
}

const PhotoView: FC<PhotoViewProps> = props => {
    const { src, name, downloadable, mode, children } = props;
    const { prefix } = useContext(ConfigContext);
    const [validSrc, setValidSrc] = useState<string>('');
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getValidSrc = async () => {
        setError(null);

        if (!src) {
            setError('图片地址为空');

            return;
        }

        setLoading(true);

        // 非blob图片检查图片是否存在
        try {
            await checkImgExists(src);
            setValidSrc(src);
        } catch (err) {
            setError(err);
        }

        setLoading(false);
    };

    const handleClick = () => {
        if (mode === 'blank') {
            let aLink: any = document.createElement('a');

            aLink.href = validSrc;
            aLink.target = '_blank';
            aLink.click();
            aLink = null;

            return;
        }

        return Modal.open({
            component: <Preview src={validSrc} name={name} downloadable={downloadable} />,
            title: name || 'preview',
            closable: true,
            className: `${prefix}-photo-view-modal`,
            width: '80%'
        }).result.catch(() => {
            return;
        });
    };

    useEffect(() => {
        getValidSrc();
        // eslint-disable-next-line
    }, [src]);

    return (
        <div className={`${prefix}-photo-view-wrap`}>
            <div className={`${prefix}-photo-view-img`}>
                {!!loading && !error && !validSrc && <div> loading...</div>}
                {!!error && <div className={`${prefix}-photo-view-img-error`}>{error}</div>}
                {!!validSrc && <div onClick={handleClick}>{children}</div>}
            </div>
        </div>
    );
};

PhotoView.defaultProps = {
    mode: 'modal',
    downloadable: false
};

export default PhotoView;
