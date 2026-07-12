import { DatePicker, Form, Input, Select } from "antd";

import { useSessionStore } from "../../store";
import { StatusOptions, UrgenzaOptions } from "../../utils/Functions";

const DashboardFilters = ({ onChange }) => {
    const accountType = useSessionStore((state) => state.accountType);

    const updateFilters = (_, values) => {
        const normalized = Object.fromEntries(
            Object.entries(values)
                .filter(([, fieldValue]) => fieldValue !== undefined && fieldValue !== "")
                .map(([name, fieldValue]) => [name, fieldValue?.format ? fieldValue.format("YYYY-MM-DD") : fieldValue]),
        );
        onChange(normalized);
    };

    return (
        <Form layout="vertical" onValuesChange={updateFilters} className="grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-3 xl:grid-cols-6">
            <Form.Item name="search" label="Cerca"><Input allowClear /></Form.Item>
            <Form.Item name="status" label="Stato"><Select allowClear options={StatusOptions} /></Form.Item>
            <Form.Item name="importance" label="Urgenza"><Select allowClear options={UrgenzaOptions} /></Form.Item>
            <Form.Item name="fromDate" label="Da"><DatePicker className="w-full" /></Form.Item>
            <Form.Item name="toDate" label="A"><DatePicker className="w-full" /></Form.Item>
            {accountType === "internal" && <Form.Item name="company" label="ID azienda"><Input allowClear inputMode="numeric" /></Form.Item>}
            {accountType === "internal" && <Form.Item name="branch" label="ID filiale"><Input allowClear inputMode="numeric" /></Form.Item>}
            {accountType === "internal" && <Form.Item name="assignee" label="ID assegnatario"><Input allowClear inputMode="numeric" /></Form.Item>}
        </Form>
    );
};

export default DashboardFilters;
