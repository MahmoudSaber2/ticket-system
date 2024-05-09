export const RolesObj = ({ inEditMode, permissions }) => {
    return [
        {
            name: "name",
            label: "Ruolo",
            type: "text",
            placeholder: "Inserisci la ruolo",
            rules: { required: true, message: "Inserisci la ruolo" },
        },
        {
            name: "permissions",
            label: "Permessi",
            type: "select",
            placeholder: "Inserisci la permessi",
            rules: { required: true, message: "Inserisci la permessi" },
            mode: "multiple",
            options: permissions
        },
        {
            name: "status",
            label: "Stato",
            hidden: !inEditMode,
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
