type ButtonProps = {
	text: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	color?: "gray";
};

export default function Button({text, onClick, color}: ButtonProps) {
	
	const buttonStyle = color === "gray" 
    ? "bg-white hover:bg-gray-200 text-gray-700 border border-gray-300" 
    : "bg-blue-500 hover:bg-blue-700 text-white";

	return (
		<div className="flex items-center justify-center">
			<button
				className={`${buttonStyle} font-bold py-2 px-4 rounded-md hover:shadow focus:outline-none focus:shadow-outline`}
				type="submit"
				onClick={onClick}>
				{text}
			</button>
		</div>
	);
}
