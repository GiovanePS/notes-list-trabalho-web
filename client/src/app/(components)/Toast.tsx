	import React, { useEffect } from "react";
	import Icon from "./Icon";

	type ToastProps = {
		text: string;
		type: string;
		isOpen: boolean;
		onClose: () => void;
	};

	export default function Toast({ text, type, isOpen, onClose }: ToastProps) { /*Responsável por exibir mensagens de notificação na tela por um curto período.*/
		useEffect(() => { /*Usa o useEffect para configurar um temporizador que chama a função onClose após 2000 milissegundos (2 segundos).O efeito é acionado sempre que a propriedade isOpen muda, garantindo que o temporizador seja configurado corretamente.*/
			if (isOpen) {
				const timer = setTimeout(onClose, 2000);
				return () => clearTimeout(timer);
			}
		}, [isOpen, onClose]);

		if (!isOpen) return null; /*Se isOpen for false, o componente retorna null, o que significa que o toast não será renderizado.*/

		const color = type === "success" ? "green" : "red"; /*Se type for "success", o ícone é colorido de verde, indicando uma mensagem de sucesso. Caso contrário, o ícone é colorido de vermelho, indicando uma mensagem de erro.*/
		const icon = type === "success" ? "check_circle" : "error";

		return (
			<div className="fixed left-1/2 top-5 transform -translate-x-1/2 bg-white shadow-lg rounded-md p-4 max-w-sm w-full">
				<div className="flex items-start">
					<Icon name={icon} color={color} />
					<div className="mx-4 w-0 flex-1">
						<p className="text-sm font-medium text-gray-900">{text}</p>
					</div>
					<Icon name="close" onClick={onClose} />
				</div>
			</div>
		);
	}
