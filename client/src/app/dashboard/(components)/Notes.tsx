"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Button from "../../(components)/Button"
import Note from "./Note"
import Toast from "@/app/(components)/Toast";

interface Note {
  id: number;
  titulo: string;
  texto: string;
}

const SERVER_URL = 'http://localhost:5000'

export default function Notes() { /*submissão de um formulário para adicionar novas notas*/
  const [allNotes, setAllNotes] = useState<Note[]>([]) /*allNotes  armazena a lista de todas as notas, setAllNotes atualiza esse estado*/

  const [toastShow, setToastShow] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastText, setToastText] = useState("");

  const showToast = (type: string, text: string) => {
		setToastText(text);
		setToastType(type);
		setToastShow(true);
  };
  const closeToast = () => setToastShow(false);

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => { /*Esta função é chamada quando o usuário envia o formulário para adicionar uma nova nota */
    event.preventDefault() /*impede o recarregamento da página*/
    try {
      const formData = new FormData(event.currentTarget)
      const title = formData.get('title')!.toString() /*Obtendo os valores q foram inseridos em "título" e "texto"*/
      const text = formData.get('text')!.toString()
      addNote(title, text) /*Chama a função addNote para adicionar a nova nota*/
    } catch (error) {
      console.error(error)
    }
  }

  const addNote = async (titulo: string, texto: string) => { /*A função addNote faz uma solicitação POST para adicionar uma nova nota ao servidor usando a API fetch. */
    try {
      const body = { titulo, texto }
      const response = await fetch(`${SERVER_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: 'include'
      })

      if (response.status === 200) {
        showToast('success', 'Nota adicionada com sucesso!')
        getAllNotes()
      } else if (response.status === 400) {
        showToast('error', 'Nota sem título não pode ser adicionada!')
      }
    } catch (error) {
      showToast('error', 'Erro ao adicionar nota')
      console.error(error)
    }
  }

  const deleteNote = async (id: number) => {  
    try {
      const body = { id }  /* A função deleteNote faz uma solicitação DELETE para excluir uma nota com base no ID fornecido.*/
      const response = await fetch(`${SERVER_URL}/notes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      if (response.status === 200) {
        showToast('success', 'Nota apagada com sucesso!')
        getAllNotes() /*Se a solicitação for bem-sucedida, a função chama getAllNotes para obter todas as notas atualizadas.*/
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getAllNotes = async () => {  /*A função getAllNotes faz uma solicitação GET para obter todas as notas do servidor.*/
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

      setAllNotes(arr) /*Se a solicitação for bem-sucedida, os dados são convertidos para o formato Note e atualizam o estado allNotes.*/
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllNotes(); /*O hook useEffect é utilizado para chamar a função getAllNotes quando o componente é montado.*/
  }, []);

  return ( /* renderização do componente*/
		<>
			<div className="container mx-auto">
				<h1 className="text-center my-6 mr-6">Lista de Notas</h1>
				<form
					className="flex flex-col md:flex-row items-center justify-center mx-2 md:space-x-2"
					onSubmit={onSubmitForm}
				>
					<input
						className="input md:w-1/4 w-3/4 mx-auto"
						type="text"
						placeholder="Adicionar título"
						name="title"
						onChange={(e) => e.target.value}
					/>
					<input
						className="input w-3/4 mx-auto"
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
					<tbody>
						{allNotes?.map((nota) => (
							<Note
                key={nota.id}
								note={nota}
								onDelete={() => deleteNote(nota.id)}
                toEdit={getAllNotes}
							/>
						))}
					</tbody>
				</table>
			</div>
      <Toast /*componente utilizado para exibir mensagens temporárias na interface do usuário, como mensagens de sucesso, erro ou informações.*/
				type={toastType}
				text={toastText}
				isOpen={toastShow}
				onClose={closeToast}
			/>
		</>
  );
};