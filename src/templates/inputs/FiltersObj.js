import { StatusOptions, StatusOptions2 } from "../../utils/Functions";

export const TicketFilterInputs = ({ customes, azienda, tags }) => {
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
            name: "importance",
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
			name: "tag",
			label: "Tag",
			type: "select",
			placeholder: "Inserisci la Tag",
			rules: { required: false, message: "Inserisci la Tag" },
			options: tags,
		},
        {
            name: "company",
            label: "Azienda",
            type: "select",
            placeholder: "Inserisci la azienda",
            options: azienda,
        },
        {
            name: "status",
            label: "Stato",
            type: "select",
            placeholder: "Inserisci lo stato",
            options: StatusOptions,
        },
    ];
};

export const CustomerFilterInputs = ({ azienda }) => {
    return [
        {
            name: "search",
            label: "Cerca",
            type: "text",
            placeholder: "Cerca",
        },
        {
            name: "company",
            label: "Azienda",
            type: "select",
            placeholder: "Inserisci la azienda",
            options: azienda,
        },
        {
            name: "status",
            label: "Stato",
            type: "select",
            placeholder: "Inserisci lo stato",
            options: StatusOptions2,
        },
    ];
};

export const AdminFilterInputs = () => {
    return [
        {
            name: "search",
            label: "Cerca",
            type: "text",
            placeholder: "Cerca",
        },
        {
            name: "status",
            label: "Stato",
            type: "select",
            placeholder: "Inserisci lo stato",
            options: StatusOptions2,
        },
    ];
};
