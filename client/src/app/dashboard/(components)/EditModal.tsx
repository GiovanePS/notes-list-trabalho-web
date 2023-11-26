import React from "react";
import Button from "../../(components)/Button";
interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	note: { titulo: string; texto: string };
	onSave: (updatedNote: { titulo: string; texto: string }) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, note, onSave }) => {
	const [titulo, setTitulo] = React.useState(note.titulo);
	const [texto, setTexto] = React.useState(note.texto);

	const handleSave = () => {
		onSave({ titulo, texto });
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50">
			<div className="relative top-20 mx-auto p-5 border md:w-1/3 w-3/4 shadow-lg rounded-md bg-white">
				<div className="mt-3 text-center">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Editar Nota
					</h3>
					<div className="flex flex-col justify-center items-center m-4">
						<input
							type="text"
							className="input1 w-full p-2" // Adjusted for full width
							value={titulo}
							onChange={(e) => setTitulo(e.target.value)}
						/>
						<textarea
							className="input1 w-full p-2 mt-2" // Adjusted for full width
							rows={5}
							value={texto}
							onChange={(e) => setTexto(e.target.value)}
						/>
					</div>

					<div className="flex justify-center space-x-4">
						<Button text="Cancel" color="gray" onClick={onClose} />
						<Button text="Save" onClick={handleSave} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
