import { Dropdown } from "antd";
import { DownOutlined, FileTextOutlined } from "@ant-design/icons";

import Button from "../Buttons";

const TableHeader = ({
    onClick,
    buttonName,
    dataLength,
    ListName,
    showExport = true,
    exportAction,
    exporting = false,
}) => {
    const exportItems = [{
        key: "server-csv",
        label: <div className="flex items-center gap-2" onClick={exportAction}><FileTextOutlined /><span>Esporta CSV</span></div>,
    }];

    return (
        <div className="flex flex-col gap-4 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-xl font-semibold text-slate-900">{ListName}</h1>
                <p className="mt-1 text-sm text-slate-500">{dataLength || 0} elementi</p>
            </div>
            <div className="flex items-center gap-3">
                {buttonName && <Button type="primary" onClick={onClick} size="large">{buttonName}</Button>}
                {showExport && exportAction && (
                    <Dropdown menu={{ items: exportItems }} trigger={["click"]} placement="bottomLeft">
                        <Button type="default" size="large" loading={exporting} className="flex cursor-pointer items-center gap-2">
                            Esporta <DownOutlined />
                        </Button>
                    </Dropdown>
                )}
            </div>
        </div>
    );
};

export default TableHeader;
