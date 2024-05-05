export function GetOptions(arr, name) {
    const options = arr?.find((item) => item?.label === name)?.options;
    return options
}