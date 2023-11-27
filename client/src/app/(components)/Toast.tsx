	import React, { useState, useEffect } from "react";
	import Icon from "./Icon";

	type ToastProps = {
		text: string;
		type: string;
		isOpen: boolean;
		onClose: () => void;
	};

	export default function Toast({ text, type, isOpen, onClose }: ToastProps) {
		useEffect(() => {
			if (isOpen) {
				const timer = setTimeout(onClose, 2000);
				return () => clearTimeout(timer);
			}
		}, [isOpen, onClose]);

		if (!isOpen) return null;

		const color = type === "success" ? "green" : "red";
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
