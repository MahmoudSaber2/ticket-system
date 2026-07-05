import { Form } from "antd";

import { FilterWrapper, UiContainer, SelectInput, TextInput, DateInput } from "../../components/common";
import { TicketFilterInputs } from "../../templates/inputs/FiltersObj";
import { useFilter, useTable } from "../../store";
import { useSelects } from "../../hooks/global/useSelectsHook";
import { GetOptions } from "../../utils/Functions";
import { useFormDataChanges } from "../../hooks/global/useFormDataChanges";
import { resetPaginationToFirstPage } from "../../utils/tickets";

const TicketFilter = () => {
    const { filterData, setFilterData } = useFilter();
    const { setPagenation } = useTable();
    const [form] = Form.useForm();

    const { data: selects, isLoading } = useSelects();

    const updateTicketFilter = (newFilterData) => {
        setPagenation(resetPaginationToFirstPage(useTable.getState().pagenation));
        setFilterData(newFilterData);
    };

    const { handelFormChange } = useFormDataChanges(filterData, updateTicketFilter);

    const handleValuesChange = (changedValues) => {
        const key = Object.keys(changedValues)[0];
        const value = changedValues[key];

        // Format dayjs date objects to string before passing to filter
        if (value && typeof value === "object" && value.format) {
            handelFormChange({ [key]: value.format("YYYY-MM-DD") });
        } else {
            handelFormChange(changedValues);
        }
    };

    const FilterInputs = TicketFilterInputs({
        customes: GetOptions(selects, "customers") || [],
        azienda: GetOptions(selects, "companies") || [],
        tags: GetOptions(selects, "parameters") || [],
    }).map((input) => {
        let InputComponent;
        if (input?.type === "select") {
            InputComponent = SelectInput;
        } else if (input?.type === "date") {
            InputComponent = DateInput;
        } else {
            InputComponent = TextInput;
        }

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
            onValuesChange={handleValuesChange}>
            <UiContainer>
                <FilterWrapper
                    className="border-none"
                    title={"Filtro"}
                    loading={isLoading}
                    withButtons={false}
                    withClear={true}
                    clearFilter={() => {
                        form?.resetFields();
                        updateTicketFilter({});
                    }}>
                    {FilterInputs}
                </FilterWrapper>
            </UiContainer>
        </Form>
    );
};

export default TicketFilter;
