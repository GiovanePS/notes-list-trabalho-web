import React, { useState} from "react";
import NoteIcon from "./NoteIcon";
import EditModal from "./EditModal";

type NoteProps = {
	note: any;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Note(props: NoteProps) {
	
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openEditModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleSave = (updatedNote: { titulo: string; texto: string }) => {
		// Update the note here
		closeModal();
	};
	
	// State to track visibility of icons
	const [showIcons, setShowIcons] = useState(false);

	// Event handler to toggle visibility
	const toggleIcons = (e: React.MouseEvent) => {
		setShowIcons(!showIcons);
	};

	return (
		<>
			<EditModal
				isOpen={isModalOpen}
				onClose={closeModal}
				note={{ titulo: props.note.titulo, texto: props.note.texto }}
				onSave={handleSave}
			/>
			<tr
				className="bg-white hover:bg-gray-100 group"
				key={props.note.id}
			>
				<td className="px-4 py-2 w-1/4">{props.note.titulo}</td>
				<td className="px-4 py-2 border-2 w-3/4 border-black-200">
					{props.note.texto}
				</td>

				<td className="py-2 relative">
					<div className="md:flex hidden items-center space-x-2 opacity-0 group-hover:opacity-100">
						<NoteIcon name="edit" onClick={openEditModal} />
						<NoteIcon name="person_add" />
						<NoteIcon name="delete" onClick={props.onClick} />
					</div>

					<div className="md:hidden" onClick={toggleIcons}>
						<NoteIcon name="more_vert" />
					</div>

					{showIcons && ( // Conditional rendering based on showIcons state
						<div className="relative right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
							<div className="">
								<NoteIcon name="edit" onClick={openEditModal} />
								<NoteIcon name="person_add" />
								<NoteIcon
									name="delete"
									onClick={props.onClick}
								/>
							</div>
						</div>
					)}
				</td>
			</tr>
		</>
	);
}

