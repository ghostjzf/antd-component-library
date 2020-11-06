import React, { Children, useState, useEffect, useRef, cloneElement, useContext } from 'react';
import { Row } from 'antd';
import { ConfigContext } from '../../ConfigProvider';
import './style.less';

const Container = props => {
    const [width, setWidth] = useState(0);
    const [span, setSpan] = useState(6);
    const [lastItemSpan, setLastItemSpan] = useState(6);
    const { children } = props;
    const ref = useRef(null);
    const ALLSPAN = 24;
    const { prefix } = useContext(ConfigContext);

    useEffect(() => {
        if (ref?.current) {
            const width = (ref.current as any).offsetWidth;

            setWidth(width);

            window.addEventListener('resize', function() {
                if (ref?.current) {
                    const width = (ref.current as any).offsetWidth;

                    setWidth(width);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (ref?.current) {
            if (width === 0) {
                setSpan(6);

                return;
            }

            if (width >= 1800) {
                setSpan(4);
            } else if (width >= 1200) {
                setSpan(6);
            } else if (width >= 992) {
                setSpan(8);
            } else if (width >= 768) {
                setSpan(12);
            } else if (width >= 576) {
                setSpan(24);
            } else {
                setSpan(24);
            }
        }
    }, [width]);

    useEffect(() => {
        if (ref?.current) {
            const lastItemSpan = getLastItemSpan();

            setLastItemSpan(lastItemSpan);
        }
        // eslint-disable-next-line
    }, [span]);

    const count = Children.toArray(children).length;

    function getLastItemSpan() {
        const numbers = ALLSPAN / span - Math.abs(ALLSPAN / span - (count - 1));
        const restSpan = numbers * span;

        if (numbers === 0) {
            return ALLSPAN;
        }

        return restSpan;
    }

    function renderChildren(child, index) {
        if (typeof child.type === 'function') {
            return cloneElement(child, {
                $span: index < count - 1 ? span : lastItemSpan
            });
        }

        return child;
    }

    return (
        <Row ref={ref} className={`${prefix}-easy-table-layout`}>
            {Children.map(children, (child, index) => {
                return renderChildren(child, index);
            })}
        </Row>
    );
};

export default Container;
