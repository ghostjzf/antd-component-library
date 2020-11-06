import * as React from 'react';
import { Component } from 'react';
import { render as reactRender, unmountComponentAtNode } from 'react-dom';
import { ConfigConsumer, ConfigConsumerProps } from '../ConfigProvider';
import { LoadingOutlined } from '@ant-design/icons';
import './style.less';

export interface LoadingProps {
    loading?: boolean;
    tip?: string;
}

const LoadingElement = ({ prefix = 'jigsaw', tip }) => (
    <div className={`${prefix}-loading-element`}>
        <LoadingOutlined className={`${prefix}-loading-element-icon`} />
        {tip ? <div className={`${prefix}-loading-element-text`}>{tip}</div> : null}
    </div>
);

class Loading extends Component<LoadingProps> {
    static defaultProps = {
        loading: true
    };

    static global = (visible: boolean, tip?: string) => {
        const open = () => {
            const container = document.createElement('div');

            container.className = 'jigsaw-loading-global';

            document.body.appendChild(container);

            document.body.classList.add('jigsaw-loading-effect');

            reactRender(<LoadingElement tip={tip} />, container);
        };

        const close = () => {
            const oldContainer = document.querySelector('.jigsaw-loading-global');

            if (oldContainer) {
                document.body.classList.remove('jigsaw-loading-effect');

                unmountComponentAtNode(oldContainer);

                document.body.removeChild(oldContainer);
            }
        };

        const unClosedContainer = document.querySelector('.jigsaw-loading-global');

        if (unClosedContainer) {
            close();
        }

        if (visible) {
            open();
        } else {
            close();
        }
    };

    renderLoading = ({ prefix }: ConfigConsumerProps) => {
        const { loading, tip, children } = this.props;

        if (!children) {
            return loading ? (
                <div className={`${prefix}-loading-inline`}>
                    <LoadingElement tip={tip} prefix={prefix} />
                </div>
            ) : null;
        }

        return (
            <div className={`${prefix}-loading-container`}>
                {loading && (
                    <div className={`${prefix}-loading-nested`}>
                        <LoadingElement tip={tip} prefix={prefix} />
                    </div>
                )}
                <div className={loading ? `${prefix}-loading-blur` : ''}>{children}</div>
            </div>
        );
    };

    render() {
        return <ConfigConsumer>{this.renderLoading}</ConfigConsumer>;
    }
}

export default Loading;
