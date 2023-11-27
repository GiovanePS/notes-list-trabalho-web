import React from "react";

type IconProps = {
	name: string;
	color?: "green" | "red";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Icon({ name, color, onClick }: IconProps) {
	let textColorClass = "text-gray-600"; // Default case - no color class is applied

	if (color === "green") {
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
