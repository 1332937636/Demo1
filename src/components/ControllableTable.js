import React, { useState, useEffect } from 'react';
import { Table, Button, Popover, Checkbox, Space } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const ControllableTable = ({ columns, dataSource, ...restProps }) => {
  // 初始化列配置，为每列添加默认的visible属性
  const initColumns = columns.map(col => ({
    ...col,
    visible: col.visible !== undefined ? col.visible : true
  }));

  // 维护列的显示状态
  const [columnConfig, setColumnConfig] = useState(initColumns);
  // 维护当前显示的列
  const [visibleColumns, setVisibleColumns] = useState([]);

  // 当columnConfig变化时，更新visibleColumns
  useEffect(() => {
    const visibleCols = columnConfig
      .filter(col => col.visible)
      .map(col => {
        // 移除visible属性，避免传递给Table组件
        const { visible, ...restCol } = col;
        return restCol;
      });
    setVisibleColumns(visibleCols);
  }, [columnConfig]);

  // 切换列的显示状态
  const toggleColumnVisibility = (columnKey) => {
    setColumnConfig(prevConfig => {
      return prevConfig.map(col => {
        if (col.key === columnKey || col.dataIndex === columnKey) {
          return { ...col, visible: !col.visible };
        }
        return col;
      });
    });
  };

  // 渲染列选择器
  const renderColumnSelector = () => (
    <Space direction="vertical" style={{ maxHeight: '200px', overflowY: 'auto' }}>
      {columnConfig.map(col => (
        <Checkbox
          key={col.key || col.dataIndex}
          checked={col.visible}
          onChange={() => toggleColumnVisibility(col.key || col.dataIndex)}
        >
          {col.title}
        </Checkbox>
      ))}
    </Space>
  );

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Popover
          content={renderColumnSelector()}
          title="列选择"
          trigger="click"
          placement="bottomRight"
        >
          <Button icon={<FilterOutlined />}>列设置</Button>
        </Popover>
      </div>
      <Table
        columns={visibleColumns}
        dataSource={dataSource}
        {...restProps}
      />
    </div>
  );
};

export default ControllableTable;