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
      <h1 className="text-center mt-5 text-2xl font-bold text-white">Notas</h1>
      <div className="flex items-center justify-center mt-5">
        <form onSubmit={onSubmitForm}>
          <InputText id="titulo" name="titulo" type="text" placeholder="Inserir título" />
          <InputText id="texto" name="texto" type="text" placeholder="Inserir texto" />
          <Button text="Adicionar"/>
      </form>
      </div>
      <div className="flex justify-center items-center">
        <table className="table-auto text-white">
          <thead>
            <tr>
              <th className="p-8">Título</th>
              <th className="p-8">Edit</th>
              <th className="p-8">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allNotes?.map((note) => (
              <tr key={note.id}>
                <td>{note.titulo}</td>
                <td>
                  <Button text="Editar" type="button" onClick={() => {editNote(note.id)}}/>
                </td>
                <td>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => deleteNote(note.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};