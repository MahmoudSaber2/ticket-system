const StatusBadge = ({ statusCode, where }) => {
    const isImportant = where === "isImportant";
    const payStatus = where === "payStatus";
    const purchesStatus = where === "purchesStatus";
    const payType = where === "payType";

    const getSeverity = (status) => {
        const severityMap = {
            0: isImportant ? "success" : payStatus ? "danger" : purchesStatus ? "draft" : payType ? "success" : "danger",
            1: isImportant ? "warning" : payStatus ? "warning" : purchesStatus ? "success" : payType ? "warning" : "success",
            2: isImportant ? "danger" : "success",
            default: "outLine",
        };

        return severityMap[status] || severityMap.default;
    };

    const severity = getSeverity(statusCode);

    const dynamicValue = {
        0: isImportant ? "Verde" : payStatus ? "غير مسددة" : purchesStatus ? "مسودة" : payType ? "كاش" : "Disattiva",
        1: isImportant ? "Giallo" : payStatus ? "جزئيا" : purchesStatus ? "مش مسودة" : payType ? "اجل" : "Attiva",
        2: isImportant ? "Rosso" : "مسددة",
    };

    return <div className={`flex w-fit items-center justify-center rounded-full border px-3 ${severity}`}>{dynamicValue[statusCode]}</div>;
};

export default StatusBadge;
