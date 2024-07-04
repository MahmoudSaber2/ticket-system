import { Select, Tooltip } from "antd";

const SelectInput = ({ ...props }) => {
    return (
        <Select
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option?.label?.toLowerCase().includes(input.toLowerCase())}
            maxTagCount="responsive"
            maxTagPlaceholder={(omittedValues) => (
                <Tooltip title={omittedValues.map(({ label }) => label).join(", ")}>
                    <span>+{omittedValues.length}..</span>
                </Tooltip>
            )}
            {...props}
        />
    );
};

export default SelectInput;
