"use client";

import { useState } from "react";
import Link from "next/link";
import InputText from "@/app/(components)/InputText";
import Button from "@/app/(components)/Button";
import Toast from "@/app/(components)/Toast";
import { FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { checkAuth } from "@/services/authService";
import { baseUrl } from "@/config";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams()

	const [toastShow, setToastShow] = useState(false);
	const [toastType, setToastType] = useState("success");
	const [toastText, setToastText] = useState("");

	const showToast = (type: string, text: string) => { /*Gerencia exibição de toast*/
		setToastText(text);
		setToastType(type);
		setToastShow(true);
	};

	const closeToast = () => setToastShow(false);

	useEffect(() => {
		const fetchAuthStatus = async () => {
			try {
				const checkingAuth: any = await checkAuth(); /*Utiliza o hook useEffect para verificar se o usuário já está autenticado quando a página é carregada.*/
				if (checkingAuth) {
					router.push("/dashboard"); /*Redireciona automaticamente para a página de dashboard se o usuário já estiver autenticado.*/
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchAuthStatus();
	}, [router]);

	useEffect(() => { /*Utiliza outro useEffect para verificar se a query string contém um parâmetro "registered" igual a "true".*/
		const registeredUser = searchParams.get('registered')

		if (registeredUser === 'true') {
			showToast("success", "Conta criada com sucesso!") /*Se sim, exibe um toast indicando que a conta foi criada com sucesso.*/
		}
	}, [])

	async function submitHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const formData = new FormData(event.currentTarget); /*Obtém os dados do formulário (email e senha) e faz uma solicitação POST para o servidor de autenticação.*/
			const email = formData.get("email")!.toString();
			const password = formData.get("password")!.toString();

			const body = { email, password };
			const response = await fetch(`${baseUrl}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
				credentials: "include",
			});

			if (response.status == 200) { /*Se o login for bem-sucedido (status 200), redireciona para a página de dashboard.*/
				showToast("success", "Login realizado com sucesso!");
				router.push("/dashboard");
			} else if (response.status === 401) { /*Se houver falha na autenticação (status 401), exibe um toast informando que o usuário ou a senha estão incorretos.*/
				showToast('error', "E-mail e/ou senha incorreto(s).")
			}
		} catch (error) {
			showToast("error", "Erro ao realizar login."); /*Em caso de erro durante a solicitação, exibe um toast indicando um erro no login.*/
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
