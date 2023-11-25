import React from "react";
import NoteIcon from "./NoteIcon";

type NoteProps = {
	note: any
	onDelete: () => void;
};

export default function Button(props: NoteProps) {
	return (
		<tr className="bg-white border-b border-gray-200 hover:bg-gray-100" key={props.note.id}>
			<td className="px-4 py-2 w-1/4">{props.note.titulo}</td>
			<td className="px-4 py-2 border-2 w-3/4 border-red-200">{props.note.texto}</td>
			<td className="flex justify-end items-center space-x-4 px-4 py-2 opacity-0 hover:opacity-100">
				<NoteIcon name="edit" />
        <NoteIcon name="person_add" />
        <NoteIcon name="delete" onClick={props.onDelete}/>
			</td>
		</tr>
	);
}
