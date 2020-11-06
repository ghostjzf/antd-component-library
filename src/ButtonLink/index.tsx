import React, { FC, HTMLProps, MouseEvent as ReactMouseEvent } from 'react';

const ButtonLink: FC<HTMLProps<HTMLAnchorElement>> = props => {
    const proxyClick = (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();

        if (typeof props.onClick === 'function') {
            props.onClick(event);
        }
    };

    return (
        <a {...props} onClick={proxyClick}>
            {props.children}
        </a>
    );
};

export default ButtonLink;
