import { memo } from "react";

import DefButton from "../Buttons";

import { FilterOutlined } from "@ant-design/icons";

const FilterWrapper = ({ title, clearFilter, loading, children, withButtons = true, className, withClear }) => {
    return (
        <div className={`rounded-md border bg-white p-5 ${className}`}>
            <h1 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <FilterOutlined /> {title}
            </h1>
            <div className="mb-2 grid grid-cols-4 gap-4">{children}</div>
            {withButtons && (
                <div className="flex flex-wrap items-center justify-end gap-2">
                    <DefButton
                        type="primary"
                        size="large"
                        loading={loading}
                        htmlType="submit">
                        Carca
                    </DefButton>
                    <DefButton
                        type="primary"
                        size="large"
                        danger
                        htmlType="button"
                        onClick={() => clearFilter()}>
                        Azzera Filtri{" "}
                    </DefButton>
                </div>
            )}
            {withClear && (
                <DefButton
                    type="primary"
                    size="large"
                    danger
                    htmlType="button"
                    onClick={() => clearFilter()}>
                    Azzera Filtri{" "}
                </DefButton>
            )}
        </div>
    );
};

const MemoizedComponent = memo(FilterWrapper);
export default MemoizedComponent;
