export const CustomeObj = ({ azienda }) => {
    return [
        {
            name: "customerId",
            hidden: true,
        },
        {
            name: "firstname",
            label: "Nome",
            type: "text",
            placeholder: "Inserisci il nome",
            rules: { required: true, message: "Inserisci il nome" },
        },
        {
            name: "lastname",
            label: "Cognome",
            type: "text",
            placeholder: "Inserisci il cognome",
            rules: { required: true, message: "Inserisci il cognome" },
        },
        {
            name: "pin",
            label: "PIN",
            type: "text",
            placeholder: "Inserisci il pin",
            rules: { required: true, message: "Inserisci il pin" },
        },
        {
            name: "companyId",
            label: "Azienda",
            type: "select",
            placeholder: "Inserisci la azienda",
            rules: { required: true, message: "Inserisci la azienda" },
            options: azienda,
        },
        {
            name: "status",
            label: "Stato",
            type: "select",
            placeholder: "Inserisci la stato",
            rules: { required: true, message: "Inserisci la stato" },
            options: [
                { label: "Attivo", value: 1 },
                { label: "Inattivo", value: 0 },
            ],
        },
    ];
};
