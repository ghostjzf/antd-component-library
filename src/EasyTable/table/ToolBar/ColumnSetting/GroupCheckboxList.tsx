import React from 'react';
import { Checkbox } from 'antd';

const GroupCheckboxList: React.FC<{
    checkedList: any[];
    setCheckedList(key: string | number, value: boolean): void;
}> = ({ checkedList, setCheckedList }) => {
    const onCheckChagne = (checked, key) => {
        setCheckedList(key, checked);
    };

    return (
        <>
            {checkedList.map(item => {
                return (
                    <div key={item.key}>
                        <Checkbox onChange={e => onCheckChagne(e.target.checked, item.key)} checked={item.show}>
                            {item.title}
                        </Checkbox>
                    </div>
                );
            })}
        </>
    );
};

export default GroupCheckboxList;
