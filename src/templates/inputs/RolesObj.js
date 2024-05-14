export const RolesObj = ({ permissions }) => {
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
    ];
};
