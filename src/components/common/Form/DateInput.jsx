import { DatePicker } from "antd";

const DateInput = ({ ...props }) => {
    return (
        <DatePicker
            allowClear
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            {...props}
        />
    );
};

export default DateInput;
