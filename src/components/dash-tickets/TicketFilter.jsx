import { Form } from "antd";
import React from "react";

import { FilterWrapper, UiContainer, SelectInput, TextInput } from "../../components/common";
import { TicketFilterInputs } from "../../templates/inputs/FiltersObj";
import { useFilter } from "../../store";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { GetOptions } from "../../utils/Functions";
import { useFormDataChanges } from "../../hooks/global/useFormDataChanges";

const TicketFilter = () => {
    const { filterData, setFilterData } = useFilter();
    const [form] = Form.useForm();

    const { data: selects, isLoading } = useSelects();

    const { handelFormChange } = useFormDataChanges(filterData, (newFilterData) => setFilterData(newFilterData));

    const FilterInputs = TicketFilterInputs({
        customes: GetOptions(selects, "customers") || [],
        azienda: GetOptions(selects, "companies") || [],
        tags: GetOptions(selects, "parameters") || [],
    }).map((input) => {
        const InputComponent = input?.type === "select" ? SelectInput : TextInput;
        return (
            <Form.Item
                key={input.name}
                label={input?.label}
                className="col-span-1 !mb-2"
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

export default TicketFilter;
