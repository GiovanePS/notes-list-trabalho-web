import { ChangeEvent } from "react";

type InputTextProps = {
	id: string;
	type: string;
	name: string;
	value?: string;
	placeholder?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
};

export default function InputText(props: InputTextProps) { /*Representa um campo de entrada de texto. */
	return (
		<div className="mb-4">
			<input
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
				id={props.id}
				type={props.type}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.onChange} /* Uma função de retorno de chamada opcional que será chamada quando o valor do campo de entrada for alterado.*/
				required
			/>
		</div>
	);
}
