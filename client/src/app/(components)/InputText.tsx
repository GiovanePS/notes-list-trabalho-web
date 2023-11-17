type InputTextProps = {
	id: string;
	type: string;
	name: string;
	placeholder: string;
};

export default function InputText(props: InputTextProps) {
	return (
		<div className="mb-4">
			<input
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				id={props.id}
				type={props.type}
				name={props.name}
				placeholder={props.placeholder}
				required
			/>
		</div>
	);
}
