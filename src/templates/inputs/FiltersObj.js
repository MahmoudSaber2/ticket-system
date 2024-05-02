export const TicketFilterInputs = () => {
    return [
        {
            name: "nome",
            label: "Nome",
            type: "select",
            placeholder: "Inserisci il nome",
            rules: { required: true, message: "Inserisci il nome" },
            options: [
                { label: "Nero", value: 2 },
                { label: "Giallo", value: 1 },
                { label: "Verde", value: 0 },
            ],
        },
        {
            name: "urgenza",
            label: "Urgenza",
            type: "select",
            placeholder: "Inserisci la urgenza",
            rules: { required: true, message: "Inserisci la urgenza" },
            options: [
                { label: "Rosso", value: 2 },
                { label: "Giallo", value: 1 },
                { label: "Verde", value: 0 },
            ],
        },
        {
            name: "azienda",
            label: "Azienda",
            type: "select",
            placeholder: "Inserisci la azienda",
            rules: { required: true, message: "Inserisci la azienda" },
            options: [
                { label: "Azienda 1", value: 1 },
                { label: "Azienda 2", value: 2 },
                { label: "Azienda 3", value: 3 },
            ],
        },
    ];
};
