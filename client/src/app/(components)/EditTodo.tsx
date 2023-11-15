"use client";
import React, { Fragment, useState, ChangeEvent, MouseEvent } from "react";

interface EditTodoProps {
  todo: {
    todo_id: number;
    description: string;
  };
}

const EditTodo: React.FC<EditTodoProps> = ({ todo }) => {
  const [description, setDescription] = useState<string>(todo.description);

  const updateDescription = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:3000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location.href = "/";
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="bg-yellow-500 text-white px-3 py-1 rounded"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
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
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
