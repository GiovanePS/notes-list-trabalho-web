import React, { useState } from "react";
import NoteIcon from "../../(components)/NoteIcon";
import EditModal from "./EditModal";
import FriendModal from "./FriendModal";
import Toast from "@/app/(components)/Toast";

type NoteProps = {
	note: any;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	toEdit?: () => void;
};

export default function Note({note, onClick, toEdit}: NoteProps) { /*toEdit é uma função opcional que pode ser chamada para atualizar o estado das notas ao editá-las.*/
	
	const [isEditModalOpen, setIsEditModalOpen] = useState(false); /*estados para controlar a abertura e fechamento de modais (isEditModalOpen e isFrindModalOpen), a exibição de toasts (toastShow, toastType, toastText), e a visibilidade de ícones(showIcons, logo abaixo)*/
	const [isFrindModalOpen, setIsFriendModalOpen] = useState(false);

	const openEditModal = () => setIsEditModalOpen(true); /*funções que manipulam os estados supramencionados*/
	const closeEditModal = () => setIsEditModalOpen(false);

	const openFriendModal = () => setIsFriendModalOpen(true);
	const closeFrindModal = () => setIsFriendModalOpen(false);

	const [toastShow, setToastShow] = useState(false);
	const [toastType, setToastType] = useState("success");
	const [toastText, setToastText] = useState("");

	const showToast = (type: string, text: string) => {
		setToastText(text);
		setToastType(type);
		setToastShow(true);
	};

	const closeToast = () => setToastShow(false);

	const handleSave = async (id: number, titulo: string, texto: string) => { /*A função handleSave é chamada quando o usuário salva a edição de uma nota. Ela faz uma solicitação PUT para atualizar os detalhes da nota no servidor.*/
		try {
			const body = { id, titulo, texto }; /*Criação de objeto contendo id da nota atualizada, novo título, novo texto*/
			const response = await fetch("http://localhost:5000/notes", {
				method: "PUT", /*Utiliza a API fetch para fazer uma solicitação PUT para a URL "http://localhost:5000/notes" com o corpo da requisição contendo o objeto body. */
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
				credentials: "include",
			});

			if (response.status === 200) {
				showToast("success", "Nota editada com sucesso!"); /*Se a resposta do servidor tem status 200 (OK), exibe um toast de sucesso e chama a função toEdit (se fornecida) para atualizar o estado das notas.*/
				if (toEdit) {
					toEdit();
				}
			}
		} catch (error) {
			console.error(error);
		}

		closeEditModal(); /*Fecha o modal de edição, independentemente do resultado da solicitação.*/
	};

	const handleShare = async (email: string) => { /* A função handleShare é chamada quando o usuário compartilha uma nota com um amigo. Ela faz uma solicitação POST para informar ao servidor que a nota deve ser compartilhada.*/
		try {
			const note_id = note.id
			const body = { email, note_id };
			const response = await fetch("http://localhost:5000/notes/share", { /*Utiliza a API fetch para fazer uma solicitação POST para a URL "http://localhost:5000/notes/share" com o corpo da requisição contendo o objeto body.*/
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
				credentials: "include",
			});

			if (response.status === 200) {
				showToast("success", "Nota compartilhada com sucesso!") /*Se a resposta do servidor tem status 200 (OK), exibe um toast de sucesso.*/
			}
		} catch (error) {
			showToast("error", "Erro ao compartilhar nota.")
			console.error(error);
		}

		closeFrindModal(); /*Fecha o modal de compartilhamento.*/
	}

	// State to track visibility of icons
	const [showIcons, setShowIcons] = useState(false);

	// Event handler to toggle visibility (mobile)
	const toggleIcons = (e: React.MouseEvent) => {
		setShowIcons(!showIcons);
	};

	return (
		<>
			<EditModal
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				note={note}
				onSave={handleSave}
			/>
			<FriendModal
				isOpen={isFrindModalOpen}
				onClose={closeFrindModal}
				onAdd={handleShare}
			/>
			<Toast
				type={toastType}
				text={toastText}
				isOpen={toastShow}
				onClose={closeToast}
			/>
			<tr /*renderização do componente*/
				className="bg-white hover:bg-gray-50 border-b rounded group"
				key={note.id}
			>
				<td className="px-4 py-2 w-1/4">{note.titulo}</td>
				<td className="px-4 py-2 w-3/4">{note.texto}</td>

				<td className="py-2 relative">
					<div className="md:flex hidden items-center space-x-2 opacity-0 group-hover:opacity-100">
						<NoteIcon name="edit" onClick={openEditModal} />
						<NoteIcon name="person_add" onClick={openFriendModal} />
						<NoteIcon name="delete" onClick={onClick} />
					</div>

					<div className="md:hidden" onClick={toggleIcons}>
						<NoteIcon name="more_vert" />
					</div>

					{showIcons && ( // Conditional rendering based on showIcons state
						<div className="relative right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
							<div className="">
								<NoteIcon name="edit" onClick={openEditModal} />
								<NoteIcon name="person_add" />
								<NoteIcon name="delete" onClick={onClick} />
							</div>
						</div>
					)}
				</td>
			</tr>
		</>
	);
}
