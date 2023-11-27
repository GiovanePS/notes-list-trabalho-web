import React, { useState } from "react";
import NoteIcon from "../../(components)/NoteIcon";
import EditModal from "./EditModal";

type NoteProps = {
	note: any;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	toEdit?: () => void;
};

export default function Note({note, onClick, toEdit}: NoteProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleSave = async (id: number, titulo: string, texto: string) => {
		try {
			const body = { id, titulo, texto };
			const response = await fetch("http://localhost:5000/notes", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
				credentials: "include",
			});

			if (response.status === 200) {
				if (toEdit) {
					toEdit();
				}
			}
		} catch (error) {
			console.error(error);
		}

		closeModal();
	};

	// State to track visibility of icons
	const [showIcons, setShowIcons] = useState(false);

	// Event handler to toggle visibility (mobile)
	const toggleIcons = (e: React.MouseEvent) => {
		setShowIcons(!showIcons);
	};

	return (
		<>
			<EditModal
				isOpen={isModalOpen}
				onClose={closeModal}
				note={note}
				onSave={handleSave}
			/>
			<tr
				className="bg-white hover:bg-gray-50 border-b rounded group"
				key={note.id}
			>
				<td className="px-4 py-2 w-1/4">{note.titulo}</td>
				<td className="px-4 py-2 w-3/4">{note.texto}</td>

				<td className="py-2 relative">
					<div className="md:flex hidden items-center space-x-2 opacity-0 group-hover:opacity-100">
						<NoteIcon name="edit" onClick={openModal} />
						<NoteIcon name="person_add" />
						<NoteIcon name="delete" onClick={onClick} />
					</div>

					<div className="md:hidden" onClick={toggleIcons}>
						<NoteIcon name="more_vert" />
					</div>

					{showIcons && ( // Conditional rendering based on showIcons state
						<div className="relative right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
							<div className="">
								<NoteIcon name="edit" onClick={openModal} />
								<NoteIcon name="person_add" />
								<NoteIcon
									name="delete"
									onClick={onClick}
								/>
							</div>
						</div>
					)}
				</td>
			</tr>
		</>
	);
}
