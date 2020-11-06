import React from 'react';
import Modal from '@tiger/antd-modal';
import 'antd/lib/modal/style/index.css';
import '@tiger/antd-modal/modal.css';
import Preview from './Preview';

export interface IPreviewProps {
    selector: string;
}

export class PhotoView {
    data: string[];
    index: number;

    constructor(data, index) {
        this.data = data;
        this.index = index;
        this.showPreviewModal();
    }

    showPreviewModal() {
        Modal.open({
            component: <Preview data={this.data} index={this.index} />,
            title: '图片预览',
            closable: true,
            className: 'jigsaw-photo-view-modal',
            width: '80%'
        }).result.catch(() => {
            return;
        });
    }
}

export default function previewImg(selector: string, delegationSelector: string) {
    const delegations = document.querySelectorAll(delegationSelector);

    const callback = (ev, delegation) => {
        const elements = delegation.querySelectorAll(selector);
        const srcList: any = [];
        const target: any = ev.target || ev.srcElement;

        if (elements.length) {
            elements.forEach((img: any) => {
                img.src && srcList.push(img.src);
            });
        }

        if (srcList.length) {
            elements.forEach((element, index) => {
                if (element === target) {
                    new PhotoView(srcList, index);
                }
            });
        }
    };

    delegations.forEach(delegation => {
        delegation.addEventListener('click', e => callback(e, delegation));
    });
}
