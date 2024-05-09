import { Form } from "antd";
import React from "react";

import { FilterWrapper, SelectInput, TextInput, UiContainer } from "../common";
import { AdminFilterInputs } from "../../templates/inputs/FiltersObj";
import { useFormDataChanges } from "../../hooks/global/useFormDataChanges";
import { useFilter } from "../../store";

const RolesFilter = () => {
    const { filterData, setFilterData } = useFilter();
    const [form] = Form.useForm();

    const { handelFormChange } = useFormDataChanges(filterData, (newFilterData) => setFilterData(newFilterData));

    const FilterInputs = AdminFilterInputs().map((input) => {
        const InputComponent = input?.type === "select" ? SelectInput : TextInput;
        return (
            <Form.Item
                key={input.name}
                label={input?.label}
                className="col-span-1"
                name={input?.name}>
                <InputComponent
                    placeholder={input?.placeholder}
                    size="large"
                    options={input?.options}
                />
            </Form.Item>
        );
    });

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={handelFormChange}>
            <UiContainer>
                <FilterWrapper
                    className="border-none"
                    title={"Filtro"}
                    loading={false}
                    withButtons={false}
                    withClear={true}
                    clearFilter={() => {
                        form?.resetFields();
                        setFilterData({});
                    }}>
                    {FilterInputs}
                </FilterWrapper>
            </UiContainer>
        </Form>
    );
};

export default RolesFilter;
