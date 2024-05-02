export const TicketObj = () => {
	return [
		{
			name: "nome",
			label: "Nome",
			type: "text",
			placeholder: "Inserisci il nome",
			rules: { required: true, message: "Inserisci il nome" },
		},
		{
			name: "pin",
			label: "PIN",
			type: "text",
			placeholder: "Inserisci il pin",
			rules: { required: true, message: "Inserisci il pin" },
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
		{
			name: "image",
			label: "Immagine",
			type: "image",
			placeholder: "Inserisci l'immagine",
			hidden: true,
		},
		{
			name: "descrizione",
			label: "Descrizione",
			type: "textarea",
			placeholder: "Inserisci la descrizione",
			hidden: true,
		},
	];
};
