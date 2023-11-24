import React from "react";

type NoteProps = {
	title: string;
	text: string;
};

export default function Button(props: NoteProps) {
	return (
		<tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
			<td className="px-4 py-3">{props.title}</td>
			<td className="px-4 py-3">{props.text}</td>
			<td className="flex justify-end items-center space-x-8 px-4 py-3 mx-4">
				<span className="material-symbols-outlined">edit</span>
				<span className="material-symbols-outlined">person_add</span>
				<span className="material-symbols-outlined">delete</span>
			</td>
		</tr>
	);
}
