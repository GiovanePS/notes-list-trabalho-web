"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "../../(components)/Button"
import InputText from "../../(components)/InputText"

interface Note {
  id: number;
  titulo: string;
  texto: string;
}

const SERVER_URL = 'http://localhost:5000'

export default function Notes() {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  
  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const formData = new FormData(event.currentTarget)
      const titulo = formData.get('titulo')!.toString()
      const texto = formData.get('texto')!.toString()
      addNote(titulo, texto)
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
			<div className="container mx-auto mt-10">
				<table className="min-w-full">
					<tbody className="">
						<tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
							<td className="px-4 py-3">Note Description</td>
							<td>
				        <span className="material-symbols-outlined">delete</span>
							</td>
						</tr>
						<tr className="bg-white border-b border-gray-200">
							<td className="px-4 py-3">Note 2 Description</td>
							<td className="px-4 py-2">
								<div className="flex justify-end opacity-0 hover:opacity-100">
									<span className="material-symbols-outlined">delete</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
  );
};