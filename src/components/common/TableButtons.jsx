import { Dropdown } from "antd";
import { useState } from "react";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiEdit, CiTrash } from "react-icons/ci";

import { ConfirmModal } from "./global/ConfirmModal";
import { FaEye } from "react-icons/fa";

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

const TableButtons = ({ editRow, deleteRow, show, ...props }) => {
    const [open, setOpen] = useState();

    return (
        <div className="flex items-center justify-center gap-2">
            <div className="rounded bg-slate-200/20 p-[5px]">
                {editRow && (
                    <CiEdit
                        size={20}
                        color="blue"
                        className="cursor-pointer"
                        onClick={() => editRow(props?.record)}
                    />
                )}
            </div>
            <div className="rounded bg-slate-200/20 p-[5px]">
                {show && (
                    <FaEye
                        size={20}
                        color="#4096ff"
                        className="cursor-pointer"
                        onClick={() => show()}
                    />
                )}
            </div>
            <div className="rounded bg-slate-200/20 p-[5px]">
                <CiTrash
                    size={20}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => setOpen(true)}
                />
            </div>
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
