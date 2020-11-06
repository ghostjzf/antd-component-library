import * as React from 'react';

export declare type Locale = 'zh_CN' | 'zh_TW' | 'en_US';
export declare type Region = 'CN' | 'US';

export interface ConfigConsumerProps {
    locale: Locale;
    prefix: string;
    getToken?: () => string;
    region: Region;
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
    locale: 'zh_CN',
    prefix: 'jigsaw',
    region: 'CN'
});

export const ConfigConsumer = ConfigContext.Consumer;
