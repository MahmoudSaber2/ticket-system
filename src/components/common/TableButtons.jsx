import { Dropdown, Tooltip } from "antd";
import { useState } from "react";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiEdit, CiTrash } from "react-icons/ci";

import { ConfirmModal } from "./global/ConfirmModal";
import { FaEye } from "react-icons/fa";
import { MessageOutlined } from "@ant-design/icons";

export const TableBtnsMenu = (changeStatus, status) => {
    return [
        status === 1
            ? {
                  label: (
                      <div className="flex items-center justify-start gap-1">
                          <span className="size-[10px] rounded-full border border-red-500 bg-red-400" /> Disattiva
                      </div>
                  ),
                  key: "4",
                  onClick: () => changeStatus(0),
              }
            : {
                  label: (
                      <div className="flex items-center justify-start gap-1">
                          <span className="size-[10px] rounded-full border border-green-500 bg-green-400" /> Attiva
                      </div>
                  ),
                  key: "3",
                  onClick: () => changeStatus(1),
              },
    ];
};

const TableButtons = ({ editRow, deleteRow, show, timeline, ...props }) => {
    const [open, setOpen] = useState();

    return (
        <div className="flex items-center justify-center gap-2">
            {editRow && (
                <div className="rounded bg-slate-200/20 p-[5px]">
                    <CiEdit
                        size={20}
                        color="blue"
                        className="cursor-pointer"
                        onClick={() => editRow(props?.record)}
                    />
                </div>
            )}
            {show && (
                <Tooltip title="Apri dettagli">
                    <button
                        type="button"
                        aria-label="Apri dettagli ticket"
                        className="flex items-center justify-center rounded bg-slate-200/20 p-[5px]"
                        onClick={() => show()}
                    >
                    <FaEye
                        size={20}
                        color="#4096ff"
                    />
                    </button>
                </Tooltip>
            )}
            {timeline && (
                <Tooltip title="Apri cronologia">
                    <button
                        type="button"
                        aria-label="Apri cronologia ticket"
                        className="flex items-center justify-center rounded bg-slate-200/20 p-[5px] text-lg text-blue-600"
                        onClick={timeline}
                    >
                        <MessageOutlined />
                    </button>
                </Tooltip>
            )}
            {deleteRow && (
                <div className="rounded bg-slate-200/20 p-[5px]">
                    <CiTrash
                        size={20}
                        color="red"
                        className="cursor-pointer"
                        onClick={() => setOpen(true)}
                    />
                </div>
            )}
            {props?.withStatus && (
                <Dropdown
                    menu={{
                        items: TableBtnsMenu((status) => props?.changeStatus?.(props.record, status) || {}, props?.status),
                    }}
                    trigger={["click"]}>
                    <div className="flex size-[30px] cursor-pointer items-center justify-center rounded-md border bg-slate-400 text-xl text-white transition hover:opacity-75">
                        <HiOutlineDotsVertical />
                    </div>
                </Dropdown>
            )}

            <ConfirmModal
                onConfirm={() => deleteRow(props?.record)}
                open={open}
                setOpen={() => setOpen(false)}
            />
        </div>
    );
};

export default TableButtons;
