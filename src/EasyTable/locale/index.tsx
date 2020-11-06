import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
import zhTW from './locale/zh_TW';

export interface IntlType {
    locale: string;
    getMessage: (id: string, defaultMessage: string) => string;
}

type UseIntlType = (locale: string) => { Intl: IntlType };

function get(source: object, path: string, defaultValue?: string): string | undefined {
    // a[3].b -> a.3.b
    const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let result = source;
    let message = defaultValue;

    // eslint-disable-next-line no-restricted-syntax
    for (const p of paths) {
        message = Object(result)[p];
        result = Object(result)[p];

        if (message === undefined) {
            return defaultValue;
        }
    }

    return message;
}

const createIntl = (locale: string, localeMap: { [key: string]: any }): IntlType => ({
    getMessage: (id: string, defaultMessage: string) => get(localeMap, id, defaultMessage) || defaultMessage,
    locale
});

const zhCNIntl = createIntl('zh_CN', zhCN);
const enUSIntl = createIntl('en_US', enUS);
const zhTWIntl = createIntl('zh_TW', zhTW);

const intlMap = {
    'zh-CN': zhCNIntl,
    zh_CN: zhCNIntl,
    'en-US': enUSIntl,
    en_US: enUSIntl,
    'zh-TW': zhTWIntl,
    zh_TW: zhTWIntl
};

export const useIntl: UseIntlType = locale => {
    const Intl = intlMap[locale] || zhCNIntl;

    return {
        Intl
    };
};
