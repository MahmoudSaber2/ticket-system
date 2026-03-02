import { Dropdown } from "antd";
import { DownOutlined, FileExcelOutlined, FileTextOutlined } from "@ant-design/icons";

import Button from "../Buttons";
import { exportToExcel, exportToCSV } from "../../../utils/exportUtils";

const TableHeader = ({ 
    onClick, 
    buttonName, 
    dataLength, 
    ListName, 
    data, 
    columns,
    showExport = true,
    fetchAll 
}) => {
    
    const handleExportExcel = async () => {
        let exportData = data;
        
        // If fetchAll function is provided, use it to get all data
        if (fetchAll) {
            exportData = await fetchAll();
        }
        
        if (exportData && exportData.length > 0 && columns) {
            exportToExcel(exportData, ListName || "export", columns);
        }
    };

    const handleExportCSV = async () => {
        let exportData = data;
        
        // If fetchAll function is provided, use it to get all data
        if (fetchAll) {
            exportData = await fetchAll();
        }
        
        if (exportData && exportData.length > 0 && columns) {
            exportToCSV(exportData, ListName || "export", columns);
        }
    };

    const exportItems = [
        {
            key: "excel",
            label: (
                <div className="flex items-center gap-2" onClick={handleExportExcel}>
                    <FileExcelOutlined />
                    <span>Esporta in Excel</span>
                </div>
            ),
        },
        {
            key: "csv",
            label: (
                <div className="flex items-center gap-2" onClick={handleExportCSV}>
                    <FileTextOutlined />
                    <span>Esporta in CSV</span>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-row-reverse flex-wrap items-center justify-between gap-3 py-5">
            <div className="flex items-center gap-3">
                {buttonName && (
                    <Button
                        type="primary"
                        onClick={onClick}
                        size="large">
                        {buttonName}
                    </Button>
                )}

                {showExport && ((data && data.length > 0) || fetchAll) && (
                    <Dropdown
                        menu={{ items: exportItems }}
                        trigger={["click"]}
                        placement="bottomLeft"
                    >
                        <Button
                            type="default"
                            size="large"
                            className="flex cursor-pointer items-center gap-2"
                        >
                            Esporta <DownOutlined />
                        </Button>
                    </Dropdown>
                )}
            </div>

            <h1 className="text-xl font-bold">
                {dataLength} {ListName}
            </h1>
        </div>
    );
};

export default TableHeader;
