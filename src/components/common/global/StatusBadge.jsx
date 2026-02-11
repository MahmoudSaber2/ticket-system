import { FaCheckCircle, FaEnvelopeOpenText, FaTruckLoading, FaWindowClose } from "react-icons/fa";

const StatusBadge = ({ statusCode, where }) => {
    const isImportant = where === "isImportant";
    const isCustomer = where === "customer";

    const getSeverity = (status) => {
        const severityMap = {
            0: isCustomer ? "danger" : isImportant ? "success" : "danger",
            1: isCustomer ? "success" : isImportant ? "warning" : "success",
            2: isImportant ? "danger" : "warning",
            3: "bg-sky-500 text-white",
            default: "outLine",
        };

        return severityMap[status] || severityMap.default;
    };

    const severity = getSeverity(statusCode);

    const dynamicValue = {
        0: isCustomer ? "Inattivo" : isImportant ? "Verde" : "Aperto",
        1: isCustomer ? "Attivo" : isImportant ? "Giallo" : "Chiuso",
        2: isImportant ? "Rosso" : "In Progress",
        3: "è rifiutato",
    };

    const dynamicIcon = {
        0: isCustomer ? "" : isImportant ? "" : <FaEnvelopeOpenText />,
        1: isCustomer ? "" : isImportant ? "" : <FaCheckCircle />,
        2: isImportant ? "" : <FaTruckLoading />,
        3: <FaWindowClose />,
    };

    return (
        <div className={`flex w-fit items-center justify-center gap-2 rounded-full border px-3 ${severity}`}>
            {dynamicIcon[statusCode]} {" "} {dynamicValue[statusCode]}
        </div>
    );
};

export default StatusBadge;
