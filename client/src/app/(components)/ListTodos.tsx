"use client";
import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

interface Todo {
  todo_id: number;
  description: string;
}

const ListTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // delete todo function
  const deleteTodo = async (id: number) => {
    try {
      const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <Fragment>
      <div className="flex justify-center items-center">
          <table className="table-auto text-white">
            <thead>
              <tr>
                <th className="p-8">Description</th>
                <th className="p-8">Edit</th>
                <th className="p-8">Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.todo_id}>
                  <td>{todo.description}</td>
                  <td>
                    <EditTodo todo={todo} />
                  </td>
                  <td>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteTodo(todo.todo_id)}
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

export default ListTodos;
