import { useState } from "react";
import Button from "@/app/(components)/Button";


type FriendModalProps = { /*Representa as propriedades esperadas pelo componente.*/
    isOpen: boolean;
    onClose: () => void;
    onAdd: (email: string) => void;
};

export default function AddFriendModal({ isOpen, onClose, onAdd }: FriendModalProps) {
    
    const [email, setEmail] = useState("");

    const handleClick = () => { /*Chamada quando o botão compartilhar é clicado*/
        onAdd(email);
        onClose();
    };

    if (!isOpen) return null; /*Se isOpen for falso indica que o modal não deve ser renderizado*/

    return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50">
			<div className="relative top-20 mx-auto p-5 border md:w-1/3 w-3/4 shadow-lg rounded-md bg-white">
				<div className="mt-3 text-center">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Compartilhar Nota
					</h3>
					<div className="flex flex-col justify-center items-center m-4">
						<label className="text-left label">
              Email do Amigo:
            </label>
            <input
							type="text"
							className="input w-full p-2 my-4 mx-auto"
              onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex justify-center space-x-4">
						<Button
							text="Cancelar"
							color="gray"
							onClick={onClose}
						/>
						<Button text="Compartilhar" onClick={handleClick} />
					</div>
				</div>
			</div>
		</div>
	);
}