import React, { useState, useEffect } from "react";
import Icon from "./Icon";

type ToastProps = {
	text: string;
	type: string;
	show: boolean;
};

export default function Toast(props: ToastProps) {
	const [show, setShow] = useState(props.show);

	const closeToast = () => {
		setShow(false);
	};

	useEffect(() => {
		const timer = setTimeout(closeToast, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (!show) return null;
	console.log("show: ", show);

	const color = props.type === "success" ? "green" : "red";
	const icon = props.type === "success" ? "check_circle" : "error";

	return (
		<div className="fixed left-1/2 top-5 transform -translate-x-1/2 bg-white shadow-lg rounded-md p-4 max-w-sm w-full">
			<div className="flex items-start">
				<Icon name={icon} color={color} />
				<div className="mx-4 w-0 flex-1">
					<p className="text-sm font-medium text-gray-900">
						{props.text}
					</p>
				</div>
				<Icon name="close" onClick={() => setShow(false)} />
			</div>
		</div>
	);
};
