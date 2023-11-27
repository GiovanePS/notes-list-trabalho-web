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

	const [showMobileIcons, setShowMobileIcons] = useState(false);

	const toggleIcons = () => {
		setShowMobileIcons(!showMobileIcons);
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
					{/* Desktop */}
					<div className="md:flex hidden items-center space-x-2 opacity-0 group-hover:opacity-100">
						<NoteIcon name="edit" onClick={openModal} />
						<NoteIcon name="person_add" />
						<NoteIcon name="delete" onClick={onClick} />
					</div>

					{/* Mobile */}
					<div className="md:hidden">
						<NoteIcon name="more_vert" onClick={toggleIcons} />
						{showMobileIcons && (
						<div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
							<NoteIcon name="edit" onClick={openModal} />
							<NoteIcon name="person_add" />
							<NoteIcon name="delete" onClick={onClick} />
						</div>
						)}
					</div>
				</td>
			</tr>
		</>
	);
}
