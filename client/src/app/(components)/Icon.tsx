import React from "react";

type IconProps = {
	name: string;
	color?: "green" | "red";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function NoteIcon(props: IconProps) {
	const textColorClass = props.color ? `text-${props.color}-500` : "text-gray-600";

	return (
		<button onClick={props.onClick}>
			<span className={`material-symbols-outlined ${textColorClass}`}>
				{props.name}
			</span>
		</button>
	);
}
