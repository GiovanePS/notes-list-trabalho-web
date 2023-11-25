"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Button from "../../(components)/Button"
import Note from "./Note"


interface Note {
  id: number;
  title: string;
  text: string;
}

const SERVER_URL = 'http://localhost:5000'

export default function Notes() {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  
  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const formData = new FormData(event.currentTarget)
      const title = formData.get('title')!.toString()
      const text = formData.get('text')!.toString()
      addNote(title, text)
    } catch (error) {
      console.error(error)
    }
  }

  const addNote = async (title: string, text: string) => {
    try {
      const body = { title, text }
      const response = await fetch(`${SERVER_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: 'include'
      })

      if (response.status === 200) {
        getAllNotes()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const editNote = async (id: number) => {
    console.log(id)
  }

  const deleteNote = async (id: number) => {
    try {
      const body = { id }
      const response = await fetch(`${SERVER_URL}/notes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      if (response.status === 200) {
        getAllNotes()
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/notes`, {
        method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
      });
      const jsonData = await response.json();

      const arr: Note[] = []
      jsonData.map((note: Note) => {
        arr.push(note)
      })

      setAllNotes(arr)
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
		<>
			<div className="container mx-auto">
				<h1 className="text-center my-6 mr-6">Note List</h1>
				<form
					className="flex flex-col md:flex-row items-center justify-center mx-2"
					onSubmit={onSubmitForm}
				>
					<input
						className="input1"
						type="text"
						placeholder="Title"
						name="title"
						onChange={(e) => e.target.value}
					/>
					<input
						className="input1"
						type="text"
						placeholder="Note"
						name="text"
						onChange={(e) => e.target.value}
					/>
					<Button text="Add" />
				</form>
			</div>
			<div className="container mx-auto mt-10">
				<table className="min-w-full table-auto">
					<tbody className="">
						<tr className="bg-white border-b border-gray-200">
							<td className="px-4 py-3">Titulo</td>
							<td className="px-4 py-3">Nota</td>
						</tr>
						{allNotes?.map((nota) => (
							<Note
								id={nota.id}
								title={nota.title}
								text={nota.text}
								onDelete={() => deleteNote(nota.id)}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
  );
};