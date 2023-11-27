import React, {useState} from "react";
import Button from "../../(components)/Button";
	
interface EditModalProps {
	isOpen: boolean;/*Determina se o modal está aberto*/
	onClose: () => void; /*Função para fechar o moda*/
	note: { id: number, titulo: string; texto: string }; /*Detalhes da nota a serem editados*/
	onSave: (id: number, titulo: string, texto: string) => void; /*Função chamada quando a edição é salva*/
}

const Modal: React.FC<EditModalProps> = ({ isOpen, onClose, note, onSave }) => {
	const [titulo, setTitulo] = useState(note.titulo); /* Rastream os valores do título e texto da nota no modal.*/
	const [texto, setTexto] = useState(note.texto);

	const handleClick = () => { /*Chamada quando o botão "salvar" é clicado*/
		onSave(note.id, titulo, texto);
		onClose();
	};
	
	if (!isOpen) return null;/*Se o Modal estiver fechado ele não será renderizado*/

	return ( /*renderização do componente Modal quando aberto em div fixa que cobre toda a tela com fundo semitransparente*/
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50">
			<div className="relative top-20 mx-auto p-5 border md:w-1/3 w-3/4 shadow-lg rounded-md bg-white">
				<div className="mt-3 text-center">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Editar Nota
					</h3>
					<div className="flex flex-col justify-center items-center m-4">
						<input
							type="text"
							className="input w-full p-2" // Adjusted for full width
							value={titulo}
							onChange={(e) => setTitulo(e.target.value)}
						/>
						<textarea
							className="input w-full p-2 mt-2" // Adjusted for full width
							rows={8}
							value={texto}
							onChange={(e) => setTexto(e.target.value)}
						/>
					</div>

					<div className="flex justify-center space-x-4">
						<Button text="Cancelar" color="gray" onClick={onClose} />
						<Button text="Salvar" onClick={handleClick} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
