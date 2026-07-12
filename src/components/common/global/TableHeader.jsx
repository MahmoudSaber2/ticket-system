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
        <div className="flex flex-row-reverse flex-wrap items-center justify-between gap-3 py-5">
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
            <h1 className="text-xl font-bold">{dataLength} {ListName}</h1>
        </div>
    );
};

export default TableHeader;
