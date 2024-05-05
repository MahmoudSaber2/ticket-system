export const TicketFilterInputs = ({ customes, azienda }) => {
    return [
        {
            name: "search",
            label: "Cerca",
            type: "text",
            placeholder: "Cerca",
        },
        {
            name: "customer",
            label: "Nome",
            type: "select",
            placeholder: "Inserisci il nome",
            options: customes,
        },
        {
            name: "urgenza",
            label: "Urgenza",
            type: "select",
            placeholder: "Inserisci la urgenza",
            options: [
                { label: "Rosso", value: 2 },
                { label: "Giallo", value: 1 },
                { label: "Verde", value: 0 },
            ],
        },
        {
            name: "company",
            label: "Azienda",
            type: "select",
            placeholder: "Inserisci la azienda",
            options: azienda,
        },
    ];
};
