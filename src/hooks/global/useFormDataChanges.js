export const useFormDataChanges = (filterData, updateFilterData) => {
    let debouncedValue;
    const handelFormChange = (data) => {
        clearTimeout(debouncedValue);
        const key = Object.keys(data);
        const value = data[key];
        const newFilterData = {
            ...filterData,
            [key]: value,
        };
        debouncedValue = setTimeout(() => {
            updateFilterData(newFilterData);
        }, 500);
    };
    return {
        handelFormChange,
    };
};
