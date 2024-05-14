import { StatusOptions, UrgenzaOptions } from "../../utils/Functions";

export const TicketObj = ({ customes, azienda, inEdit }) => {
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
			rules: { required: !inEdit, message: "Inserisci il pin" },
			hidden: inEdit,
		},
		{
			name: "importance",
			label: "Urgenza",
			type: "select",
			placeholder: "Inserisci la urgenza",
			rules: { required: true, message: "Inserisci la urgenza" },
			options: UrgenzaOptions,
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
			placeholder: "Inserisci la azienda",
			options: StatusOptions,
			hidden: !inEdit,
		},
		{
			name: "branchId",
			label: "Azienda",
			type: "select",
			placeholder: "Inserisci la azienda",
			options: azienda,
			hidden: inEdit || !inEdit,
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
