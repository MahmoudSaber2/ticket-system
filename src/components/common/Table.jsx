import { Table as AntTable } from "antd";
import { memo } from "react";

const pageSizes = (total = 0) => [10, 20, 30, 40, total]
    .filter((size, index, sizes) => size > 0 && sizes.indexOf(size) === index);

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
            pagination={isPagination ? {
                ...tableParams,
                showSizeChanger: true,
                pageSizeOptions: pageSizes(Number(tableParams.total)),
                showTotal: (total, range) => `${range[0]}–${range[1]} di ${total}`,
            } : false}
            loading={loadingTable}
            locale={{ emptyText: "Nessun dato disponibile" }}
            rowClassName="transition-colors hover:bg-slate-50"
            size="middle"
            showSorterTooltip={false}
            scroll={{ x: "max-content" }}
            className="w-full overflow-hidden rounded-lg border border-slate-200"
        />
    );
};

export default memo(Table);
