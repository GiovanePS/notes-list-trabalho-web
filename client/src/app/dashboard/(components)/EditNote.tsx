"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";

export default function EditNote(note: any) {
  const [texto, setTexto] = useState<string>(note.texto);

  const updateDescription = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const body = { texto };
      const response = await fetch(
        `http://localhost:5000/notes/${note.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="bg-yellow-500 text-white px-3 py-1 rounded"
        data-toggle="modal"
        data-target={`#id${note.id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${note.id}`}
        onClick={() => setTexto(note.texto)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setTexto(note.texto)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={texto}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTexto(e.target.value)
                }
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded"
                data-dismiss="modal"
                onClick={() => setTexto(note.texto)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};