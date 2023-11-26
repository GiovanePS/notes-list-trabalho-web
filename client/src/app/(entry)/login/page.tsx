"use client"
import { useState } from "react";
import Link from "next/link";
import InputText from '@/app/(components)/InputText';
import Button from '@/app/(components)/Button';
import Toast from '@/app/(components)/Toast';
import { FormEvent, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { checkAuth } from "@/services/authService";

export default function LoginPage() {
	const router = useRouter()

	const [toastShow, setToastShow] = useState(false);
	const [toastType, setToastType] = useState("success");
	const [toastText, setToastText] = useState("");

  	useEffect(() => {
    const fetchAuthStatus = async () => {
			try {
				const checkingAuth: any = await checkAuth()
        if (checkingAuth) {
          router.push('/dashboard')
        }
			} catch (error) {
				console.error(error)
			}
		}

		fetchAuthStatus()
	}, [router])

	async function submitHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		try {
			const formData = new FormData(event.currentTarget)
			const email = formData.get('email')!.toString()
			const password = formData.get('password')!.toString()
			
			const body = { email, password }
			const response = await fetch('http://localhost:5000/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
				credentials: 'include',
			})

			if (response.status == 200) {
				setToastShow(true);
				setToastText('Login efetuado com sucesso!');
				console.log('Login efetuado com sucesso!')
				router.push('/dashboard')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<h1 className="header">Log In</h1>
			<form onSubmit={submitHandler} className="px-8 pt-6 pb-8 mb-4">
				<InputText id="email" type="text" name='email' placeholder="Email" />
				<InputText id="password" type="password" name='password' placeholder="Senha" />
				<Button text="Entrar"/>
				<div className="mt-6 text-center text-gray-700 text-sm">
					Não possui conta?{" "}
					<Link href="/register" className="text-blue-400 hover:text-blue-300">
						Registre-se!
					</Link>
				</div>
			</form>
			<Button text="Toast" onClick={() => {
				setToastShow(true);
				setToastText('Login efetuado com sucesso!');
				setToastType('success');
				console.log(toastShow)
			}} />
			<Toast type={toastType} text={toastText} show={toastShow} />
		</>
  );
}