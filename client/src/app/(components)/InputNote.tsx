"use client";

import React, { Fragment, useState, FormEvent } from "react";
import Button from "./Button";

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
		<Fragment>
			<div className="container mx-auto">
				<h1 className="text-center mt-5">Pern Todo List</h1>
				<form
					className="flex items-center mx-2"
					onSubmit={onSubmitForm}
				>
					<input
						className="shadow border rounded w-full py-2 px-3 mr-6 text-gray-700 focus:outline-none focus:shadow-outline"
						type="text"
            placeholder="Add Note"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
					/>
					<Button text="Add" />
				</form>
			</div>
		</Fragment>
	);
};
