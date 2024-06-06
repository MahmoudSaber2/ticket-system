import { Cookies } from "react-cookie";

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

export function GetPermission(name) {
    const cookies = new Cookies();
    const permission = cookies.get("permissions");
    
    const getAccess = permission?.find((item) => item?.permissionName === name)?.access;

    return getAccess;
}

export const UrgenzaOptions = [
    { label: "Rosso", value: 2 },
    { label: "Giallo", value: 1 },
    { label: "Verde", value: 0 },
];

export const StatusOptions = [
    { label: "Aperto", value: 1 },
    { label: "Chiuso", value: 0 },
    { label: "In Progress", value: 2 },
];
