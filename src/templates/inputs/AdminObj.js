export const AdminObj = ({ roles, inEditMode }) => {
    return [
        {
            name: "userId",
            hidden: true,
        },
        {
            name: "avatar",
            hidden: true,
        },
        {
            name: "name",
            label: "Nome",
            type: "text",
            placeholder: "Inserisci il nome",
            rules: { required: true, message: "Inserisci il nome" },
        },
        {
            name: "username",
            label: "Utente",
            type: "text",
            placeholder: "Inserisci il utente",
            rules: { required: true, message: "Inserisci il utente" },
        },
        {
            name: "email",
            label: "Email",
            type: "text",
            placeholder: "Inserisci il email",
            rules: { required: true, message: "Inserisci il email" },
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Inserisci il password",
            rules: inEditMode ? {} : { required: true, message: "Inserisci il password" },
            isPassword: true,
        },
        {
            name: "phone",
            label: "Numero di telefono",
            type: "text",
            placeholder: "Inserisci il telefono",
            rules: { required: true, message: "Inserisci il telefono" },
        },
        {
            name: "address",
            label: "Indirizzo",
            type: "text",
            placeholder: "Inserisci il indirizzo",
            rules: { required: true, message: "Inserisci il indirizzo" },
        },
        {
            name: "roleId",
            label: "Ruolo",
            type: "select",
            placeholder: "Inserisci la ruolo",
            rules: { required: true, message: "Inserisci la ruolo" },
            options: roles,
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
