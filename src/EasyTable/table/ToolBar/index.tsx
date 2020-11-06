import React, { useContext } from 'react';
import { Row, Col, Space, Divider } from 'antd';
import { ToolBarProps } from '../../types/table.type';
import { EasyTableContext } from '../../EasyTable';
import RedoIcon from './RedoIcon';
import DensityIcon from './DensityIcon';
import FullscreenIcon from './FullscreenIcon';
import ColumnSetting from './ColumnSetting';
import './style.less';

interface IToolBarProps extends ToolBarProps {
    filterColumn(newColumns: any[]): void;
}

const Toolbar: React.FC<IToolBarProps> = props => {
    const { title, toolBarRender, tableSettings, toolBarOptions = {}, filterColumn } = props;
    const { requestLoading, requestReload, rowSelectData, columns } = useContext(EasyTableContext) as any;
    const { tableSize, setTableSize } = tableSettings;
    const defaultToolBarOptions = {
        showReload: false,
        showDensity: true,
        showSetting: true,
        showFullScreen: true
    };
    const realOptions = Object.assign(defaultToolBarOptions, toolBarOptions);

    const renderDivider = () => {
        if (Object.values(realOptions).filter(Boolean).length === 0 || !toolBarRender) {
            return false;
        }

        return <Divider type="vertical" />;
    };

    const renderOptionsDom = () => {
        if (toolBarOptions) {
            const { showFullScreen, showReload, showDensity, showSetting } = realOptions;

            return (
                <Space size="large" className="toolbar-wrap">
                    {showReload && <RedoIcon spin={requestLoading} onClick={requestReload} />}
                    {showDensity && <DensityIcon size={tableSize} onSelect={setTableSize} />}
                    {showSetting && <ColumnSetting localColumns={columns} filterColumn={filterColumn} />}
                    {showFullScreen && <FullscreenIcon />}
                </Space>
            );
        }

        return null;
    };

    const toolBarRenderPayload = { reload: requestReload, rowSelectData };

    return (
        <Row justify="space-between" align="middle">
            <Col>
                <h4>{title}</h4>
            </Col>
            <Col>
                <Row align="middle">
                    <Col>
                        <Space>{toolBarRender && toolBarRender(toolBarRenderPayload)}</Space>
                    </Col>
                    <Col>
                        {renderDivider()}
                        {renderOptionsDom()}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Toolbar;
