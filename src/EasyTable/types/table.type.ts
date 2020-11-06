import { TableProps as AntdTableProps, ColumnProps } from 'antd/lib/table';

type headerTitle = React.ReactNode | string;

type rowSelectionType =
    | true
    | {
          onChange?: (selectedRows: any[], selectedRowKeys: any[]) => void;
          disabled?: (record) => boolean;
      }
    | undefined;

export interface ToolBarProps {
    title?: headerTitle;
    toolBarRender?: (payload: any) => React.ReactNode;
    toolBarOptions?: {
        showFullScreen?: boolean | undefined;
        showReload?: boolean | undefined;
        showDensity?: boolean | undefined;
        showSetting?: boolean | undefined;
    };
    tableSettings?: any;
}

export interface TableProps extends ToolBarProps, Omit<AntdTableProps<any>, 'title' | 'columns'> {
    defaultData?: any[] | null;
    data?: any[];
    onRequestError?: (e: any) => void;
    columns: ((params: any) => ColumnProps<any>[]) | undefined;
    $rowSelection?: rowSelectionType;
    $showPagination?: boolean;
    pageSize?: number;
    error?: string;
}
