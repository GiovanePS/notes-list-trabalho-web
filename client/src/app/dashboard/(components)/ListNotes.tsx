"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "../../(components)/Button"
import InputText from "../../(components)/InputText"
import EditNote from "./EditNote";

interface Note {
  id: number;
  titulo: string;
  texto: string;
}

export default function ListNotes() {
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

  //add note
  const addNote = async (titulo: string, texto: string) => {
    try {
      const body = { titulo, texto }
      const response = await fetch("http://localhost:5000/notes", {
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

  // delete todo function
  const deleteNote = async (id: number) => {
    try {
      const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getAllNotes = async () => {
    console.log('contador')
    try {
      const response = await fetch("http://localhost:5000/notes", {
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
          <InputText id="texto" name="texto" type="text" placeholder="Inserir nota" />
          <Button text="Adicionar"/>
      </form>
      </div>
      <div className="flex justify-center items-center">
        <table className="table-auto text-white">
          <thead>
            <tr>
              <th className="p-8">Title</th>
              <th className="p-8">Description</th>
              <th className="p-8">Edit</th>
              <th className="p-8">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allNotes?.map((note) => (
              <tr key={note.id}>
                <td>{note.titulo}</td>
                <td>{note.texto}</td>
                <td>
                  <EditNote note={note as Note} />
                </td>
                <td>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
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