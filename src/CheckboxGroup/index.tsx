import * as React from 'react';
import { FC, useState, useContext } from 'react';
import { Checkbox } from 'antd';
import { CheckboxGroupProps as _CheckboxGroupProps, CheckboxOptionType } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { ConfigContext } from '../ConfigProvider';

export declare type CheckboxOptions = Array<CheckboxOptionType | string>;

enum CheckAllText {
    zh_CN = '全选',
    zh_TW = '全選',
    en_US = 'Check All'
}

export interface CheckboxGroupProps extends Omit<_CheckboxGroupProps, 'options'> {
    options: CheckboxOptions;
}

const getIndeterminateStatus = (checkedList, options) => {
    return !!checkedList.length && checkedList.length < options.filter(item => !item.disabled).length;
};

const getCheckAllStatus = (checkedList, options) => {
    return checkedList.length === options.filter(item => !item.disabled).length;
};

const CheckboxGroup: FC<CheckboxGroupProps> = ({ options, onChange, defaultValue, value, disabled, name }) => {
    const { prefix, locale } = useContext(ConfigContext);
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(value || defaultValue || []);
    const [indeterminate, setIndeterminate] = useState(getIndeterminateStatus(checkedList, options));
    const [checkAll, setCheckAll] = useState(getCheckAllStatus(checkedList, options));

    if (!options?.length) {
        throw new Error('[jigsaw error]: please set "options" prop');
    }

    const onGroupChange = checkedList => {
        setCheckedList(checkedList);
        setIndeterminate(getIndeterminateStatus(checkedList, options));
        setCheckAll(getCheckAllStatus(checkedList, options));

        onChange && onChange(checkedList);
    };

    const onCheckAllChange = e => {
        const _checkListValue = [] as CheckboxValueType[];

        if (e.target.checked) {
            options.forEach(item => {
                if (typeof item === 'string') {
                    _checkListValue.push(item);
                } else if (!!item.value) {
                    if (!item.disabled) {
                        _checkListValue.push(item.value);
                    }
                }
            });
        }

        setCheckedList(_checkListValue);
        setIndeterminate(false);
        setCheckAll(e.target.checked);

        onChange && onChange(_checkListValue);
    };

    return (
        <div className={`${prefix}-check-box-group`}>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} disabled={disabled}>
                {CheckAllText[locale]}
            </Checkbox>
            <Checkbox.Group
                options={options}
                value={checkedList}
                onChange={onGroupChange}
                name={name}
                disabled={disabled}
            />
        </div>
    );
};

export default CheckboxGroup;
