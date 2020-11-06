import React, { FC, useRef, useState, useEffect, useContext } from 'react';
import { Button } from 'antd';
import { toBlobPolyfill } from './utils';
import {
    RotateLeftOutlined,
    RotateRightOutlined,
    DownloadOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import { ConfigContext } from '../../ConfigProvider';
import './style.less';

export interface PreviewProps {
    data: string[];
    close?: () => void;
    index?: number;
}

// canvas 绘制的最大宽度和最小宽度
const MAXWIDTH = 1400;
const MINWIDTH = 600;

const Preview: FC<PreviewProps> = ({ data, index = 0 }) => {
    const myCanvas = useRef(null as any);
    const [deg, setDeg] = useState(0);
    const [current, setCurrent] = useState(index);
    const { prefix } = useContext(ConfigContext);

    let canvas, ctx, img;

    const rotate = (direct: 1 | -1) => {
        const offset = direct * 90;
        let formatDeg = (deg + offset) % 360;

        setDeg(formatDeg);

        canvas = myCanvas.current;
        ctx = canvas.getContext('2d');

        img = new Image();
        img.setAttribute('crossOrigin', 'Anonymous');
        img.src = data[current];

        img.onload = () => {
            const W = Math.max(Math.min(img.width, MAXWIDTH), MINWIDTH);
            const H = (img.height * W) / img.width;

            if (formatDeg % 180 !== 0) {
                canvas.width = H;
                canvas.height = W;
            } else {
                canvas.width = W;
                canvas.height = H;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx!.translate(canvas.width / 2, canvas.height / 2);
            ctx!.rotate((Math.PI * formatDeg) / 180);
            ctx!.drawImage(img, -W / 2, -H / 2, W, H);
            ctx!.restore();
        };
    };

    const download = () => {
        const link = document.createElement('a');

        toBlobPolyfill();

        myCanvas.current.toBlob(blob => {
            const localHref = URL.createObjectURL(blob);

            link.download = '图片.jpg';
            link.href = localHref;
            link.click();
        }, 'image/jpg');
    };

    const draw = () => {
        canvas = myCanvas.current;
        ctx = canvas.getContext('2d');
        img = new Image();

        // 下面这一行很重要，如果没有设置，canvas.toDataURL 会报错，
        // 如果是非同源的图片绘制到画布会使画布受到污染，导致无法再通过toDataURL等导出
        img.setAttribute('crossOrigin', 'Anonymous');
        img.src = data[current];

        img.onload = () => {
            const W = Math.max(Math.min(img.width, MAXWIDTH), MINWIDTH);
            const H = (img.height * W) / img.width;

            canvas.width = W;
            canvas.height = H;

            ctx!.drawImage(img, 0, 0, W, H);
        };
    };

    useEffect(() => {
        draw();
        // eslint-disable-next-line
    }, [current]);

    const handleSlide = index => {
        if (index < 0 || index > data.length - 1) {
            return;
        }

        setCurrent(index);
    };

    return (
        <div className={`${prefix}-photo-view-preview-body`}>
            <div className="btn-group">
                <Button type="link" title="前一张" onClick={() => handleSlide(current - 1)} disabled={!current}>
                    <LeftOutlined />
                </Button>
                <Button
                    type="link"
                    title="左旋90度"
                    onClick={() => {
                        rotate(-1);
                    }}>
                    <RotateLeftOutlined />
                </Button>
                <Button
                    type="link"
                    title="右旋90度"
                    onClick={() => {
                        rotate(1);
                    }}>
                    <RotateRightOutlined />
                </Button>
                <Button
                    type="link"
                    title="下载"
                    onClick={() => {
                        download();
                    }}>
                    <DownloadOutlined />
                </Button>
                <Button
                    type="link"
                    title="后一张"
                    onClick={() => handleSlide(current + 1)}
                    disabled={current >= data.length - 1 ? true : false}>
                    <RightOutlined />
                </Button>
            </div>
            <canvas style={{ maxWidth: '100%' }} ref={myCanvas}></canvas>
        </div>
    );
};

export default Preview;
