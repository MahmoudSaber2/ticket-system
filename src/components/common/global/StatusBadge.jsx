const StatusBadge = ({ statusCode, where }) => {
    const inProduct = where === "product";
    const payStatus = where === "payStatus";
    const purchesStatus = where === "purchesStatus";
    const payType = where === "payType";

    const getSeverity = (status) => {
        const severityMap = {
            0: inProduct ? "warning" : payStatus ? "danger" : purchesStatus ? "draft" : payType ? "success" : "danger",
            1: inProduct ? "default" : payStatus ? "warning" : purchesStatus ? "success" : payType ? "warning" : "success",
            2: payStatus ? "success" : "success",
            default: "outLine",
        };

        return severityMap[status] || severityMap.default;
    };

    const severity = getSeverity(statusCode);

    const dynamicValue = {
        0: inProduct ? "من الخارج" : payStatus ? "غير مسددة" : purchesStatus ? "مسودة" : payType ? "كاش" : "Disattiva",
        1: inProduct ? "من الخزن" : payStatus ? "جزئيا" : purchesStatus ? "مش مسودة" : payType ? "اجل" : "Attiva",
        2: payStatus ? "مسددة" : "مسددة",
    };

    return <div className={`flex w-fit items-center justify-center rounded-full border px-3 ${severity}`}>{dynamicValue[statusCode]}</div>;
};

export default StatusBadge;
