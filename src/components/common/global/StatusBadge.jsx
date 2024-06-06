const StatusBadge = ({ statusCode, where }) => {
    const isImportant = where === "isImportant";

    const getSeverity = (status) => {
        const severityMap = {
            0: isImportant ? "success" : "danger",
            1: isImportant ? "warning" : "success",
            2: isImportant ? "danger" : "warning",
            default: "outLine",
        };

        return severityMap[status] || severityMap.default;
    };

    const severity = getSeverity(statusCode);

    const dynamicValue = {
        0: isImportant ? "Verde" : "Chiuso",
        1: isImportant ? "Giallo" : "Aperto",
        2: isImportant ? "Rosso" : "In Progress",
    };

    return <div className={`flex w-fit items-center justify-center rounded-full border px-3 ${severity}`}>{dynamicValue[statusCode]}</div>;
};

export default StatusBadge;
