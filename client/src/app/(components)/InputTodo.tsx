"use client";

import { error } from "console";
import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";
import Button from "./Button";


const InputTodo: React.FC = () => {
  const [description, setDescription] = useState<string>("");

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location.href = "/";
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5 text-2xl font-bold text-white">Notes</h1>
      <div className="flex items-center justify-center mt-5">
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            className="border border-gray-300 p-2 mr-2 w-64 h-10"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded"
          >
            Add
          </button>
      
      </form>
      </div>
    </Fragment>
  );
};

export default InputTodo;
