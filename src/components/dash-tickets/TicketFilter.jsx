import { Form } from "antd";

import { FilterWrapper, UiContainer, SelectInput, TextInput, DateInput } from "../../components/common";
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
                        setFilterData({});
                    }}>
                    {FilterInputs}
                </FilterWrapper>
            </UiContainer>
        </Form>
    );
};

export default TicketFilter;
