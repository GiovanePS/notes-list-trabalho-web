"use client";

import { useState } from "react";
import Link from "next/link";
import InputText from "@/app/(components)/InputText";
import Button from "@/app/(components)/Button";
import Toast from "@/app/(components)/Toast";
import { FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { checkAuth } from "@/services/authService";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams()

	const [toastShow, setToastShow] = useState(false);
	const [toastType, setToastType] = useState("success");
	const [toastText, setToastText] = useState("");

	const showToast = (type: string, text: string) => {
		setToastText(text);
		setToastType(type);
		setToastShow(true);
	};

	const closeToast = () => setToastShow(false);

	useEffect(() => {
		const fetchAuthStatus = async () => {
			try {
				const checkingAuth: any = await checkAuth();
				if (checkingAuth) {
					router.push("/dashboard");
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchAuthStatus();
	}, [router]);

	useEffect(() => {
		const registeredUser = searchParams.get('registered')

		if (registeredUser === 'true') {
			showToast("success", "Conta criada com sucesso!")
		}
	}, [])

	async function submitHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const formData = new FormData(event.currentTarget);
			const email = formData.get("email")!.toString();
			const password = formData.get("password")!.toString();

			const body = { email, password };
			const response = await fetch("http://localhost:5000/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
				credentials: "include",
			});

			if (response.status == 200) {
				showToast("success", "Login realizado com sucesso");
				router.push("/dashboard");
			} else if (response.status === 401) {
				showToast('error', "Usuário ou senha incorretos.")
			}
		} catch (error) {
			showToast("error", "Erro ao realizar login");
			console.error(error);
		}
	}

	return (
		<>
			<h1 className="header">Log In</h1>
			<form onSubmit={submitHandler} className="px-8 pt-6 pb-8 mb-4">
				<InputText
					id="email"
					type="text"
					name="email"
					placeholder="Email"
				/>
				<InputText
					id="password"
					type="password"
					name="password"
					placeholder="Senha"
				/>
				<Button text="Entrar" />
				<div className="mt-6 text-center text-gray-700 text-sm">
					Não possui conta? {" "}
					<Link
						href="/register"
						className="text-blue-400 hover:text-blue-300"
					>
						Registre-se!
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
