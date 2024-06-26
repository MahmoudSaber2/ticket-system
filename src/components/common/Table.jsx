import { Table as AntTable } from "antd";
import { memo } from "react";

const Table = ({
    data,
    columns,
    onChange,
    tableParams,
    isPagination,
    loadingTable,
    isTableSelect = false,
    getSelectedRows,
    selectedRowKeys = [],
}) => {
    return (
        <AntTable
            columns={columns}
            rowSelection={
                isTableSelect && {
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => getSelectedRows(selectedRowKeys, selectedRows),
                }
            }
            dataSource={data}
            onChange={onChange}
            pagination={isPagination ? tableParams : false}
            loading={loadingTable}
            showSorterTooltip={false}
            scroll={{ x: "max-content" }}
            className="w-full"
        />
    );
};

export default memo(Table);
