import React from "react";

type NoteIconProps = {
	name: string;
};

export default function NoteIcon(props: NoteIconProps) {
	return (
		<button>
			<span className="material-symbols-outlined hover:bg-gray-200 rounded-full p-2">
				{props.name}
			</span>
		</button>
	);
}
