export const TicketObj = ({ customes, azienda }) => {
	return [
		{
			name: "customerId",
			label: "Nome",
			type: "select",
			placeholder: "Inserisci il nome",
			rules: { required: true, message: "Inserisci il nome" },
			options: customes,
		},
		{
			name: "pin",
			label: "PIN",
			type: "text",
			placeholder: "Inserisci il pin",
			rules: { required: true, message: "Inserisci il pin" },
		},
		{
			name: "importance",
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
			name: "branchId",
			label: "Azienda",
			type: "select",
			placeholder: "Inserisci la azienda",
			rules: { required: true, message: "Inserisci la azienda" },
			options: azienda,
		},
		{
			name: "attachments",
			label: "Immagine",
			type: "image",
			placeholder: "Inserisci l'immagine",
			hidden: true,
		},
		{
			name: "description",
			label: "Descrizione",
			type: "textarea",
			placeholder: "Inserisci la descrizione",
			hidden: true,
		},
	];
};
