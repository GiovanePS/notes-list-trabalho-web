"use client"

import Link from "next/link";
import InputText from '@/app/(components)/InputText'
import Button from '@/app/(components)/Button'
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/(components)/Toast";

export default function RegisterPage() {
  const router = useRouter()

	const [toastShow, setToastShow] = useState(false);
	const [toastType, setToastType] = useState("success");
	const [toastText, setToastText] = useState("");

	const showToast = (type: string, text: string) => {
		setToastText(text);
		setToastType(type);
		setToastShow(true);
	};

	const closeToast = () => setToastShow(false);

	async function submitHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		try {
			const formData = new FormData(event.currentTarget)
			const username = formData.get('username')!.toString()
			const email = formData.get('email')!.toString()
			const password = formData.get('password')!.toString()

			const body = { username, email, password }
			const response = await fetch('http://localhost:5000/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})

			if (response.status === 201) {
				showToast("success", "Conta registrada com sucesso!")
				router.push('/login')
			}
		} catch (error) {
			showToast("error", "Não foi possível registrar usuário.")
			console.error(error)
		}
	}
	
	return (
		<>
			<h1 className="header">Registrar-se</h1>
			<form onSubmit={submitHandler} className="px-8 pt-6 pb-8 mb-4">
				<InputText id="username" type="text" name='username' placeholder="Nome de usuário" />
				<InputText id="email" type="email" name='email' placeholder="Email" />
				<InputText id="password" type="password" name='password' placeholder="Senha" />
				<Button text="Register" />
				<div className="mt-6 text-center text-gray-700 text-[15px]">
					Já possui conta?{" "}
					<Link href="/login" className="text-blue-400 hover:text-blue-300">
						Faça login!
					</Link>
				</div>
			</form>
			<Toast
				type={toastType}
				text={toastText}
				isOpen={toastShow}
				onClose={closeToast}
			/>
		</>
  );
}