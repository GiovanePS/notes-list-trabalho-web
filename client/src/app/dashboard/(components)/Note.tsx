import React from "react";
import NoteIcon from "./NoteIcon";

type NoteProps = {
	note: any;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Note(props: NoteProps) {
	return (
		<tr className="bg-white hover:bg-gray-100 group" key={props.note.id}>
			<td className="px-4 py-2 w-1/4">{props.note.titulo}</td>
			<td className="px-4 py-2 border-2 w-3/4 border-red-200">
				{props.note.texto}
			</td>
			<td className="px-4 py-2 opacity-0 group-hover:opacity-100">
				<div className="flex justify-end items-center space-x-4">
					<NoteIcon name="edit" />
					<NoteIcon name="person_add" />
					<NoteIcon name="delete" onClick={props.onClick} />
				</div>
			</td>
		</tr>
	);
}
