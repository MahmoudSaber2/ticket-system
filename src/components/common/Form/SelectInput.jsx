import { Select } from "antd";

const SelectInput = ({ ...props }) => {
    return (
        <Select
            allowClear
            {...props}
        />
    );
};

export default SelectInput;
