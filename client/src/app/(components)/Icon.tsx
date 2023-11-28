import React from "react";


/*Este componente fornece uma maneira reutilizável de exibir ícones com base no Material Design, permitindo a personalização da cor e a manipulação de eventos de clique.*/

type IconProps = {
	name: string;
	color?: "green" | "red";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Icon({ name, color, onClick }: IconProps) {
	let textColorClass = "text-gray-600"; // Default case - no color class is applied

	if (color === "green") { /*Se a cor for "green", a classe text-green-500 é aplicada.
							Se a cor for "red", a classe text-red-500 é aplicada.
							Se nenhuma cor for especificada, a classe padrão text-gray-600 é aplicada.*/
		textColorClass = "text-green-500";
	} else if (color === "red") {
		textColorClass = "text-red-500";
	}

	return (
		<button onClick={onClick}>
			<span className={`material-symbols-outlined ${textColorClass}`}>
				{name}
			</span>
		</button>
	);
}
