import React from "react";

type NoteIconProps = {
	name: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Icon(props: NoteIconProps) {
	return (
		<button onClick={props.onClick}>
			<span className="material-symbols-outlined hover:bg-gray-200 rounded-full p-2">
				{props.name}
			</span>
		</button>
	);
}
