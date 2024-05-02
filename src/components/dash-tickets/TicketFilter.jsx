import { Form } from "antd";
import React from "react";

import { FilterWrapper, UiContainer, SelectInput, TextInput } from "../../components/common";
import { TicketFilterInputs } from "../../templates/inputs/FiltersObj";
import { useFilter } from "../../store";

const TicketFilter = () => {
    const { setFilterData } = useFilter();
    const [form] = Form.useForm();

    const handelFormChange = () => {};

    const FilterInputs = TicketFilterInputs().map((input) => {
        const InputComponent = input?.type === "select" ? SelectInput : TextInput;
        return (
            <Form.Item
                key={input.name}
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

export default TicketFilter;
