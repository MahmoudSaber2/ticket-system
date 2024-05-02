import { useNavigate, useRouteError } from "react-router-dom";

const isError = (error) => {
	return typeof error === "object" && error !== null && ("statusText" in error || "message" in error);
};

const Error = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/", { replace: true });
	};

	return (
		<div className="container mx-auto px-4">
			<div className="flex h-screen flex-col items-center justify-center">
				<h1 className="mb-4 text-4xl font-bold">Oops!</h1>
				<p className="mb-8 text-lg font-light">Sorry, an unexpected error has occurred.</p>
				<p className="mb-8 text-xl font-bold">
					<i>{isError(error) ? error.statusText : isError(error) ? error.message : ""}</i>
				</p>
				<button
					className="rounded-md bg-teal-500 px-4 py-2 text-white"
					onClick={() => {
						handleBack();
					}}>
					Back
				</button>
			</div>
		</div>
	);
};

export default Error;
