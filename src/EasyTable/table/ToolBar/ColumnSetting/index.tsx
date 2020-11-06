import React, { useContext, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Checkbox, Popover, Tooltip, Row, Col } from 'antd';
import { ConfigContext } from '../../../../ConfigProvider';
import { useIntl } from '../../../locale';
import GroupCheckboxList from './GroupCheckboxList';
import { cloneDeep } from 'lodash';

const ColumnSetting: React.FC<{
    localColumns: any[];
    filterColumn(newColumns: any[]): void;
}> = ({ localColumns, filterColumn }) => {
    const { locale } = useContext(ConfigContext);
    const { Intl } = useIntl(locale);
    const [checkedList, setCheckedList] = useState(() => {
        return localColumns.map((item, index) => {
            item.key = item.dataIndex || item.key || index;
            item.show = true;

            return item;
        });
    });

    // 是否已经选中
    const indeterminate = !!checkedList.find(item => item.show === false);

    const switchViewColumns = newCheckedList => {
        const viewColumns = cloneDeep(newCheckedList)
            .filter(item => item.show)
            .map(item => {
                delete item.show;

                return item;
            });

        filterColumn(viewColumns);
    };

    const switchListCheckAll = checkAll => {
        const newCheckedList = checkedList.map(item => {
            item.show = checkAll;

            return item;
        });

        setCheckedList(newCheckedList);
        switchViewColumns(newCheckedList);
    };

    const onCheckAllChange = e => {
        const isCheckedAll = e.target.checked;

        switchListCheckAll(isCheckedAll);
    };

    const onSetCheckedList = (key, value) => {
        const newCheckedList = checkedList.map(item => {
            if (item.key === key) {
                item.show = value;
            }

            return item;
        });

        setCheckedList(newCheckedList);
        switchViewColumns(newCheckedList);
    };

    const reset = () => {
        switchListCheckAll(true);
    };

    return (
        <Popover
            arrowPointAtCenter
            title={
                <Row justify="space-between">
                    <Col>
                        <Checkbox onChange={onCheckAllChange} checked={!indeterminate} indeterminate={indeterminate}>
                            {Intl.getMessage('toolbar.columnShow', '列展示')}
                        </Checkbox>
                    </Col>
                    <Col>
                        <a onClick={reset}>{Intl.getMessage('form.reset', '重置')}</a>
                    </Col>
                </Row>
            }
            trigger="click"
            placement="bottomRight"
            content={<GroupCheckboxList checkedList={checkedList} setCheckedList={onSetCheckedList} />}>
            <Tooltip title={Intl.getMessage('tableToolBar.columnSetting', '列设置')}>
                <SettingOutlined />
            </Tooltip>
        </Popover>
    );
};

export default ColumnSetting;
