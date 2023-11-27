"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Button from "../../(components)/Button"
import Note from "./Note"

interface Note {
  id: number;
  titulo: string;
  texto: string;
}

const SERVER_URL = 'http://localhost:5000'

export default function Notes() {
  const [allNotes, setAllNotes] = useState<Note[]>([])
  
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

  const addNote = async (titulo: string, texto: string) => {
    try {
      const body = { titulo, texto }
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
				<h1 className="text-center my-6 mr-6">Lista de Notas</h1>
				<form
					className="flex flex-col md:flex-row items-center justify-center mx-2"
					onSubmit={onSubmitForm}
				>
					<input
						className="input md:w-1/4 w-3/4"
						type="text"
						placeholder="Adicionar título"
						name="title"
						onChange={(e) => e.target.value}
					/>
					<input
						className="input w-3/4"
						type="text"
						placeholder="Adicionar texto"
						name="text"
						onChange={(e) => e.target.value}
					/>
					<Button text="Adicionar" />
				</form>
			</div>
			<div className="container mx-auto mt-10">
				<table className="min-w-full">
					<thead>
						<tr className="border-b-2 border-gray-700">
							<th className="px-4 py-2 text-left">Título</th>
							<th className="px-4 py-2 text-left">Texto</th>
						</tr>
					</thead>
					<tbody className="">
            <Note note={{ id: 1, titulo: 'titulo', texto: 'texto' }} onClick={() => deleteNote(1)} />
            <Note note={{ id: 2, titulo: 'titulo', texto: 'texto' }} onClick={() => deleteNote(2)} />
						{allNotes?.map((nota) => (
							<Note
								note={nota}
								onClick={() => deleteNote(nota.id)}
                toEdit={getAllNotes}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
  );
};