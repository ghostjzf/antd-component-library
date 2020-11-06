import React, { useState, useEffect, useContext } from 'react';
import BaseForm from './form/BaseForm';
import Tables from './table';
import { formProps } from './types/form.type';
import { TableProps } from './types/table.type';
import { isUndefined } from './utils';
import ErrorBoundary from './ErrorBoundary';
import { ConfigContext } from '../ConfigProvider';
import ToolBar from './table/ToolBar';
import { DensitySize } from './table/ToolBar/DensityIcon';
import './style.less';

export interface EasyTableProps {
    loader?: (params: any) => Promise<any>;
    loadImmediatly?: boolean;
    formProps?: formProps;
    divider?: boolean;
    tableProps: TableProps;
    extraRender?: () => React.ReactNode;
}

export const EasyTableContext = React.createContext({});

const EasyTable: React.FC<EasyTableProps> = props => {
    const DEFAUT_PAGESIZE = 20;
    const { loader, formProps, loadImmediatly = true, tableProps, extraRender } = props;
    const { $rowSelection, $showPagination = false, error, pageSize = DEFAUT_PAGESIZE, ...restTableProps } = tableProps;
    const [params, setParams] = useState(formProps?.initialValues ?? {});
    const [pageParams, setPageParams] = useState({ pageSize: pageSize, current: 1, total: 0 });
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [rowSelectData, setRowSelectData] = useState({ selectedRows: [], selectedRowKeys: [] });
    const [loaderError, setLoaderError] = useState(error);
    const NO_PAGINATION = restTableProps?.pagination === false || $showPagination === false;
    const { prefix } = useContext(ConfigContext);
    const [localColumns, setLocalColumns] = useState([]);
    const [tableSize, setTableSize] = useState<DensitySize>('small');
    const [KEY, setKEY] = useState(0);

    function resetSelectRows() {
        setRowSelectData({ selectedRows: [], selectedRowKeys: [] });
    }

    async function fetchData(reqParams) {
        if (typeof loader === 'function') {
            setLoading(true);

            try {
                const { data, total } = await loader(reqParams);
                const realTotal = isUndefined(total) ? 0 : (total as number);

                setData(data);
                setPageParams({ ...pageParams, total: realTotal });
                resetSelectRows();
            } catch (error) {
                setLoaderError(error.error_msg || error.message || error.toString());
            }

            setLoading(false);
        }
    }

    const getReqParams = () => {
        const { pageSize, current } = pageParams;

        return {
            ...params,
            pageSize,
            current
        };
    };

    useEffect(() => {
        if (loadImmediatly) {
            const { current, pageSize, ...formValues } = getReqParams();

            if (NO_PAGINATION) {
                fetchData(formValues);
            } else {
                fetchData({ ...formValues, current, pageSize });
            }
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setKEY(KEY + 1);
    }, [params, pageParams]);

    const resetPagination = () => {
        pageParams.current = 1;

        setPageParams(pageParams);
    };

    const onSubmit = values => {
        setParams(values);

        if (NO_PAGINATION) {
            const reqParams = { ...params, ...values };

            fetchData(reqParams);

            return;
        }

        const oldReqParams = getReqParams();
        const reqParams = Object.assign(oldReqParams, values, { current: 1 });

        resetPagination();

        fetchData(reqParams);
    };

    const onReset = () => {
        const $reset = formProps?.onReset;

        if (typeof $reset === 'function') {
            // @ts-ignore
            $reset();
        }
    };

    const reload = () => {
        fetchData(getReqParams());
    };

    const getTableProps = () => {
        const { columns, ...rest } = restTableProps;
        const { selectedRowKeys } = rowSelectData;

        if ($rowSelection === true) {
            const rowSelection = {
                selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                    setRowSelectData({
                        selectedRows,
                        selectedRowKeys
                    });
                }
            };

            Object.assign(rest, {
                rowSelection
            });
        } else if ($rowSelection) {
            const { onChange, disabled } = $rowSelection;

            const rowSelection = {
                selectedRowKeys,
                getCheckboxProps: rowData => {
                    return {
                        disabled: disabled ? disabled(rowData) : false,
                        name: rowData.name
                    };
                },
                onChange: (selectedRowKeys, selectedRows) => {
                    setRowSelectData({
                        selectedRows,
                        selectedRowKeys
                    });

                    onChange && onChange(selectedRows, selectedRowKeys);
                }
            };

            Object.assign(rest, {
                rowSelection
            });
        }

        return {
            ...rest,
            columns: !!columns ? columns({ ...pageParams, reload }) : []
        };
    };

    const getPagination = () => {
        if (NO_PAGINATION) {
            return false;
        }

        if ($showPagination === true) {
            return {
                ...pageParams,
                hideOnSinglePage: true,
                showQuickJumper: true,
                ...restTableProps?.pagination,
                pageSize: pageParams.pageSize,
                onChange: page => {
                    pageParams.current = page;

                    setPageParams(pageParams);
                    resetSelectRows();

                    const reqParams = { ...getReqParams(), current: page };

                    fetchData(reqParams);
                },
                onShowSizeChange: (...args) => {
                    const pageSize = args[1];

                    pageParams.pageSize = pageSize;

                    setPageParams(pageParams);
                }
            };
        }

        return { ...restTableProps?.pagination, ...pageParams };
    };

    const finalTableProps = getTableProps();
    const { columns, title, toolBarRender, toolBarOptions } = finalTableProps;

    function filterColumn(newColumns) {
        console.log(newColumns);
        setLocalColumns(newColumns);
        setKEY(KEY + 1);
    }

    const tableSettings = {
        setTableSize,
        tableSize
    };

    return (
        <div id={`${prefix}-easy-table`} className={`${prefix}-easy-table`}>
            {formProps && <BaseForm {...formProps} onSubmit={onSubmit} onReset={onReset} />}
            {extraRender && extraRender()}
            <ErrorBoundary error={loaderError}>
                <EasyTableContext.Provider
                    value={{
                        requestReload: reload,
                        rowSelectData,
                        requestLoading: loading,
                        localColumns: localColumns.length ? localColumns : columns,
                        tableSize
                    }}>
                    <h3>
                        <ToolBar
                            key={KEY}
                            title={title}
                            toolBarRender={toolBarRender}
                            tableSettings={tableSettings}
                            toolBarOptions={toolBarOptions}
                            filterColumn={filterColumn}
                        />
                    </h3>
                    <Tables
                        key={KEY}
                        rowKey={(...args) => `${args[1]}`}
                        {...getTableProps()}
                        pagination={getPagination()}
                        data={data}
                        loading={loading}
                    />
                </EasyTableContext.Provider>
            </ErrorBoundary>
        </div>
    );
};

export default EasyTable;
