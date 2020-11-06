import * as React from 'react';
import { FC } from 'react';
import { ConfigConsumer, ConfigContext, ConfigConsumerProps as _ConfigConsumerProps, Locale, Region } from './context';

type ConfigConsumerProps = _ConfigConsumerProps;

export { ConfigConsumer, ConfigContext, ConfigConsumerProps };

export interface ConfigProviderProps {
    locale?: Locale;
    prefix?: string;
    getToken?: () => string;
    region?: Region;
}

const ConfigProvider: FC<ConfigProviderProps> = props => {
    const renderProvider = (context: ConfigConsumerProps) => {
        const { children, ...restProps } = props;

        const config: ConfigConsumerProps = Object.assign({}, context, restProps);

        let childNode = children;

        return <ConfigContext.Provider value={config}>{childNode}</ConfigContext.Provider>;
    };

    return <ConfigConsumer>{context => renderProvider(context)}</ConfigConsumer>;
};

export default ConfigProvider;
