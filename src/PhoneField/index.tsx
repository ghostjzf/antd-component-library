import './style.less';

import { Input, message, Popover, Spin, Tooltip, Button } from 'antd';
import React, { FC, useState, useEffect, useContext } from 'react';
import { connect, $Formutil, Field, FormItem, Omit, FormItemComponentProps } from 'react-antd-formutil';
import { ConfigContext } from '../ConfigProvider';
import { getCountries } from './request';

export interface PhoneFieldProps
    extends Omit<FormItemComponentProps, 'children' | 'name' | '$defaultValue' | 'required'> {
    required?: string;
    $formutil: $Formutil;
    telCodeName: string;
    phoneName: string;
    defaultTelCodeValue?: string | number;
    defaultPhoneValue?: string | number;
    telCodePlaceholder?: string;
    phonePlaceholder?: string;
    language?: string;
}

let CACHE_COUNTRY_LIST: null | any[] = null;

// 阻止冒泡
const stopBubble = event => {
    event.nativeEvent.stopImmediatePropagation(); //阻止冒泡
};

const PhoneField: FC<PhoneFieldProps> = props => {
    const { prefix, locale } = useContext(ConfigContext);
    const {
        $formutil,
        telCodeName,
        phoneName,
        defaultTelCodeValue,
        defaultPhoneValue,
        required,
        telCodePlaceholder,
        phonePlaceholder,
        language,
        ...restProps
    } = props;
    const { $params, $setValues } = $formutil;
    const [visible, setVisible] = useState(false);
    const [countryList, setCountryList] = useState(null) as any[];
    const [loading, setLoading] = useState(false);

    const getCountryList = async () => {
        if (CACHE_COUNTRY_LIST) {
            setCountryList(CACHE_COUNTRY_LIST);

            return;
        }

        setLoading(true);

        try {
            const resp = await getCountries(language || locale);
            const list = resp.data.data;

            setCountryList(list);

            CACHE_COUNTRY_LIST = list;
        } catch (error) {
            message.error(error.toString());
        }

        setLoading(false);
    };

    const updateTelCodeField = telCode => {
        $setValues({
            [telCodeName]: telCode
        });
    };

    useEffect(() => {
        getCountryList();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const closePopover = () => {
            setVisible(false);
        };

        if (visible) {
            document.addEventListener('click', closePopover);
        } else {
            document.removeEventListener('click', closePopover);
        }
    }, [visible]);

    const telCodePanel = () => {
        return (
            <div className={`${prefix}-phone-field-telcode-panel`}>
                {countryList?.length &&
                    countryList.map(category => (
                        <dl key={category.letter}>
                            <dt>{category.letter}</dt>
                            <dd>
                                {category.items.map(item => {
                                    return (
                                        <Tooltip title={`+${item.tel_code}`} key={item.country} destroyTooltipOnHide>
                                            <Button
                                                type="link"
                                                size="small"
                                                className={
                                                    `${prefix}-phone-field-country-code ` +
                                                    (item.tel_code === $params[telCodeName] ? 'current' : '')
                                                }
                                                onClick={() => updateTelCodeField(item.tel_code)}>
                                                {item.country}
                                            </Button>
                                        </Tooltip>
                                    );
                                })}
                            </dd>
                        </dl>
                    ))}
            </div>
        );
    };

    const telCodeAddon = (
        <Popover content={telCodePanel} placement="bottom" visible={visible} trigger="click" destroyTooltipOnHide>
            <Spin spinning={loading}>
                <span
                    className={`${prefix}-phone-field-telcode-value`}
                    onClick={e => {
                        stopBubble(e);
                        setVisible(true);
                    }}>
                    {$params[telCodeName] ? `+${$params[telCodeName]}` : telCodePlaceholder}
                </span>
            </Spin>
        </Popover>
    );

    const telCodeValidation = !!required
        ? {
              required: !!required,
              $validators: {
                  required: value => !!value || required
              }
          }
        : null;

    const phoneValueValidation = !!required
        ? {
              required: !!required,
              validMessage: {
                  required: required
              }
          }
        : null;

    return (
        <>
            <Field {...telCodeValidation} name={telCodeName} $defaultValue={defaultTelCodeValue} children={null} />
            <FormItem {...restProps} {...phoneValueValidation} name={phoneName} $defaultValue={defaultPhoneValue}>
                <Input
                    className={`${prefix}-phone-field-input`}
                    addonBefore={telCodeAddon}
                    placeholder={phonePlaceholder}
                />
            </FormItem>
        </>
    );
};

PhoneField.defaultProps = {
    telCodePlaceholder: '请选择',
    phonePlaceholder: '请输入手机号'
};

export default connect(PhoneField);
