"use client";
import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

interface Note {
  id: number;
  titulo: string;
  texto: string;
}

export default function ListNotes() {
  const [allNotes, setAllNotes] = useState<Note[]>([]);

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

  const getNotes = async () => {
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
    getNotes();
  }, []);

  return (
    <Fragment>
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
                  {/* <td> */}
                    {/* <EditNote note={note} /> */}
                  {/* </td> */}
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
    </Fragment>
  );
};