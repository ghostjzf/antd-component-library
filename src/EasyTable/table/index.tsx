import React, { useState, useContext } from 'react';
import { Table as AntdTable } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import ToolBar from './ToolBar';
import { TableProps } from '../types/table.type';
import { DensitySize } from './ToolBar/DensityIcon';
import { EasyTableContext } from '../EasyTable';

interface finalTableProps extends Omit<TableProps, 'columns'> {
    columns: ColumnProps<any>[];
}

const Table: React.FC<finalTableProps> = props => {
    const { title, toolBarRender, toolBarOptions, defaultData, onRequestError, data, columns, ...restProps } = props;
    const dataSource = defaultData || data;
    const { tableSize } = useContext(EasyTableContext) as any;
    // const [tableSize, setTableSize] = useState<DensitySize>('small');
    const defaultColumns = columns;
    const [localColumns, setLocalColumns] = useState(() => defaultColumns);

    function filterColumn(newColumns) {
        setLocalColumns(newColumns);
    }

    return (
        <div>
            {/* <h3>
                <ToolBar
                    title={title}
                    toolBarRender={toolBarRender}
                    tableSettings={tableSettings}
                    toolBarOptions={toolBarOptions}
                    filterColumn={filterColumn}
                />
            </h3> */}
            <AntdTable size={tableSize} {...restProps} dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default Table;
