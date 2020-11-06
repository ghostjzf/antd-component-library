import * as React from 'react';
import { Empty } from 'antd';
import { ConfigConsumer } from '../ConfigProvider';

const Tip = () => {
    return (
        <ConfigConsumer>
            {prefix => {
                return (
                    <Empty
                        className={`${prefix}-tab-router-empty-content`}
                        description="您当前无权限访问，请联系管理员开通权限"
                    />
                );
            }}
        </ConfigConsumer>
    );
};

export default Tip;
