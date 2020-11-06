import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ConfigConsumer } from '../ConfigProvider';
import axios from 'axios';
import './style.less';

/**
 * @description 富文本编辑组件
 * 
 *
 * @example
    <FormItem
     name="content"
     itemProps={{ label: '富文本' }}>
     <RichText enableImage={true} enableTable={true} />
    </FormItem>
 */

export interface RichTextProps {
    value?: string;
    onChange?: (val) => any;
    enableTable?: boolean;
    enableImage?: boolean;
    disabled?: boolean;
    plugins?: string | string[];
    toolbar?: string | string[];
}

// '10px 11px 12px 13px ... 47px 48px'
const FONTSIZE_LIST = Array.from(new Array(39), (t, index) => index + 10 + 'px').join(' ');

// [插件配置](https://www.tiny.cloud/docs/plugins/a11ychecker/)
const DEFAULT_PLUGINS = ['paste', 'advlist', 'autolink', 'link', 'lists', 'code', 'hr'];

// [图标配置](https://www.tiny.cloud/docs/configure/editor-appearance/#toolbar)
const DEFAULT_TOOLBAR = [
    'undo',
    'redo',
    'h2',
    'h3',
    'fontsizeselect',
    'forecolor',
    'backcolor',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'hr',
    'alignleft',
    'aligncenter',
    'alignright',
    'alignjustify',
    'outdent',
    'indent',
    'numlist',
    'bullist',
    'subscript',
    'superscript',
    'blockquote',
    'code',
    'removeformat',
    'link'
];

const FILE_API = {
    CN: {
        dev: 'https://cms-dev.tigerfintech.com/cms/upload/image',
        release: 'https://cms.laohu8.com/cms/upload/image'
    },
    US: {
        dev: 'https://test-customer.ihuhoo.com/file/internal/cms/api/v1/file/upload/static-itradeup',
        release: 'https://customer-internal.itradeup.com/file/internal/cms/api/v1/file/upload/static-itradeup'
    }
};

class RichText extends Component<RichTextProps> {
    editor;

    initConfig = (region, token) => {
        return {
            plugins: [
                ...DEFAULT_PLUGINS,
                this.props.enableImage ? 'image' : '',
                this.props.enableTable ? 'table' : '',
                'fullscreen'
            ]
                .filter(Boolean)
                .join(' '),
            toolbar: [
                ...DEFAULT_TOOLBAR,
                this.props.enableImage ? 'image' : '',
                this.props.enableTable ? 'table' : '',
                'fullscreen'
            ]
                .filter(Boolean)
                .join(' '),
            fontsize_formats: FONTSIZE_LIST,
            menubar: false,
            images_upload_credentials: true,
            object_resizing: false,
            convert_urls: false,
            content_style: 'html { font-size: 14px }',
            powerpaste_word_import: 'merge',
            images_upload_handler: (blobInfo, success, failure) => {
                const fileSize = blobInfo.blob().size / 1024;

                if (fileSize > 500) {
                    failure(
                        `In order to ensure the page loading speed, please control the size of a single image to be less than 500KB, the current picture size is ${fileSize}KB`
                    );

                    return;
                }

                let formData;

                formData = new FormData();
                formData.append('file', blobInfo.blob());

                const axiosInstance = axios.create();

                const isDev = process.env.NODE_ENV === 'development';

                axiosInstance
                    .post(FILE_API[region][isDev ? 'dev' : 'release'], formData, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then(
                        res => {
                            if (typeof res.data.data.url != 'string') {
                                failure('Invalid JSON: ' + JSON.stringify(res.data));
                            }

                            success(res.data.data.url);
                        },
                        err => {
                            failure(JSON.stringify(err));
                        }
                    );
            },
            setup: editor => (this.editor = editor)
        };
    };

    handleEditorChange = val => {
        this.props.onChange && this.props.onChange(val.level.content);
    };

    insertContent = (content: string) => {
        this.editor.insertContent(content);
    };

    render() {
        const { value, disabled, toolbar, plugins } = this.props;

        return (
            <ConfigConsumer>
                {({ prefix, region, getToken }) => (
                    <div className={`${prefix}-rich-text`}>
                        <Editor
                            tinymceScriptSrc="https://s.tigerfintech.com/web/tinymce/tinymce.min.js"
                            toolbar={toolbar}
                            plugins={plugins}
                            initialValue={value}
                            init={this.initConfig(region, getToken && getToken())}
                            onChange={this.handleEditorChange}
                            disabled={disabled}
                        />
                    </div>
                )}
            </ConfigConsumer>
        );
    }
}

export default RichText;
