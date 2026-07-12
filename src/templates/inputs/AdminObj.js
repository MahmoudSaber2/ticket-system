export const AdminObj = ({ inEditMode }) => {
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
        ...(inEditMode ? [{
            name: "password",
            label: "Nuova password",
            type: "password",
            placeholder: "Lascia vuoto per non modificarla",
            rules: {},
            isPassword: true,
        }] : []),
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
    ];
};
