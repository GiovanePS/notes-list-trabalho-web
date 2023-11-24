import React from "react";

type ButtonProps = {
	text: string,
	type?: "button" | "submit" | "reset" | undefined,
	onClick?: React.MouseEventHandler<HTMLButtonElement>
};

export default function Button(props: ButtonProps) {
	return (
		<div className="flex items-center justify-center my-6">
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
				type={props.type || "submit"}
				onClick={props.onClick}>
				{props.text}
			</button>
		</div>
	);
}
