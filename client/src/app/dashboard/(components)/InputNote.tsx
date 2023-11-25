"use client";

import React, { useState, FormEvent } from "react";
import Button from "../../(components)/Button";

export default function InputTodo() {
	const [description, setDescription] = useState<string>("");

	const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const body = { description };
			const response = await fetch("http://localhost:5000/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			window.location.href = "/";
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<></>
	);
};
