export function GetOptions(arr, name) {
    const options = arr?.find((item) => item?.label === name)?.options;
    return options;
}

export function sumErrors(errorObject) {
    let errorArray = [];

    // Iterate through each key in the errorObject
    for (const key in errorObject) {
        // Concatenate the error messages for each key to the errorArray
        errorArray = errorArray.concat(errorObject[key]);
    }

    return errorArray;
}

export const UrgenzaOptions = [
    { label: "Rosso", value: 2 },
    { label: "Giallo", value: 1 },
    { label: "Verde", value: 0 },
];

export const StatusOptions = [
    { label: "Attivo", value: 1 },
    { label: "Disattivo", value: 0 },
];