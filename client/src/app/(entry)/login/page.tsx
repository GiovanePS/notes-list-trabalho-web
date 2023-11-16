"use client"

import type { Metadata } from 'next'
import Link from "next/link";
import InputText from '@/app/(components)/InputText';
import Button from '@/app/(components)/Button';
import { ChangeEvent, useState } from 'react';


const metadata: Metadata = {
  title: "Login"
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
	
	async function getAuth() {
		try {
			const body = { email, password }
			const response = await fetch('http://localhost:5000/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})

			console.log(await response.json())
		} catch (error) {
			console.error(error)
		}
	}

	function submitHandler(e: React.FormEvent) {
		e.preventDefault()
		getAuth()
	}

	const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value)
	}
	
	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value)
	}

	return (
		<>
			<h1 className="header1">Sign in</h1>
			<form onSubmit={submitHandler} className="px-8 pt-6 pb-8 mb-4">
				<InputText id="email" type="text" name='email' placeholder="Email" onChange={handleChangeEmail} />
				<InputText id="password" type="password" name='password' placeholder="Password" onChange={handleChangePassword} />
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