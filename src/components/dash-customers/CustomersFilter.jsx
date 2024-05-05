import { Form } from "antd";
import React from "react";

import { FilterWrapper, SelectInput, TextInput, UiContainer } from "../common";
import { CustomerFilterInputs } from "../../templates/inputs/FiltersObj";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { useFormDataChanges } from "../../hooks/global/useFormDataChanges";
import { GetOptions } from "../../utils/Functions";
import { useFilter } from "../../store";

const UsersFilter = () => {
    const { filterData, setFilterData } = useFilter();
    const [form] = Form.useForm();

    const { data: selects, isLoading } = useSelects();

    const { handelFormChange } = useFormDataChanges(filterData, (newFilterData) => setFilterData(newFilterData));

    const FilterInputs = CustomerFilterInputs({
        azienda: GetOptions(selects, "companies") || [],
    }).map((input) => {
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
                    loading={isLoading}
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

export default UsersFilter;
