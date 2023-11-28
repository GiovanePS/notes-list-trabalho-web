type ButtonProps = {
	text: string;
	onClick?: (React.MouseEventHandler<HTMLButtonElement>);
	color?: "gray";
};

export default function Button({text, onClick, color}: ButtonProps) {
	
	const buttonStyle = color === "gray" 
    ? "bg-white hover:bg-gray-200 text-gray-700 border border-gray-300" /*Se color for "gray", o botão terá um estilo de botão padrão (background branco, texto cinza, borda cinza).*/
    : "bg-blue-500 hover:bg-blue-700 text-white"; /*Se color não estiver definido ou for diferente de "gray", o botão terá um estilo azul padrão (background azul, texto branco).*/

	return (
		<div className="flex items-center justify-center">
			<button
				className={`${buttonStyle} font-bold py-2 px-4 rounded-md hover:shadow focus:outline-none focus:shadow-outline`}
				type="submit"
				onClick={onClick}> {/*Quando o botão é clicado, a função onClick será chamada, se estiver definida.*/}
				{text}
			</button>
		</div>
	);
}
