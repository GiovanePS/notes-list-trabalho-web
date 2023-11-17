"use client"

import Link from "next/link";
import InputText from '@/app/(components)/InputText';
import Button from '@/app/(components)/Button';
import { FormEvent } from 'react';
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter()
	
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
				router.push('/dashboard')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<h1 className="header1">Sign in</h1>
			<form onSubmit={submitHandler} className="px-8 pt-6 pb-8 mb-4">
				<InputText id="email" type="text" name='email' placeholder="Email" />
				<InputText id="password" type="password" name='password' placeholder="Password" />
				<Button text="Sign in"/>
				<div className="mt-6 text-center text-gray-700 text-sm">
					Don't have an account?{" "}
					<Link href="/register" className="text-blue-400 hover:text-blue-300">
						Register here
					</Link>
				</div>
			</form>
		</>
  );
}