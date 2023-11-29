"use client"

import InputText from "@/app/(components)/InputText";
import Button from "@/app/(components)/Button";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/services/authService";
import DashboardNavBar from "../(components)/DashboardNavBar";
import Toast from "@/app/(components)/Toast";
import { baseUrl } from "@/config";

export default function Profile() {
  const router = useRouter()

  const [toastShow, setToastShow] = useState(false);
	const [toastType, setToastType] = useState("success");
	const [toastText, setToastText] = useState("");

  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

	const showToast = (type: string, text: string) => {
		setToastText(text);
		setToastType(type);
		setToastShow(true);
	};

	const closeToast = () => setToastShow(false);

	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const checkingAuth: any = await checkAuth()
        setIsAuthenticated(checkingAuth)

        if (!checkingAuth) {
          router.push('/login')
        }
      } catch (error) {
        console.error(error)
      }
    }

		fetchAuthStatus()
	}, [router])

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/user`, {
          method: 'GET',
          headers: { "Content-Type": "application/json"},
          credentials: 'include'
        })

        const userData = await response.json()

        if (userData) {
          setUsername(userData.username || '')
          setEmail(userData.email || '')
        }
      } catch (error) {
        console.error(error)
      }
    }

    getUserData()
  }, [])

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== passwordConfirm) {
      showToast("error", "Senha e Confirmação de Senha devem ser iguais.");
      return;
    }
    
    try {
      const formData = new FormData(event.currentTarget)
      const username = formData.get('username')!.toString()
      const email = formData.get('email')!.toString()

      const body = { username, email, password }
      const response = await fetch(`${baseUrl}/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })

      if (response.status === 200) {
        router.push('/dashboard?updateduser=true')
      }
    } catch (error) {
      showToast("error", "Não foi possível alterar usuário.")
      console.error(error)
    }
  }
    
  if (isAuthenticated) {
    return (
      <>
        <DashboardNavBar />
        <div className="container mx-auto max-w-sm">
          <h1 className="header">Atualizar Perfil</h1>
          <form className="px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
            <label className="label">Usuario:</label>
            <InputText id="username" type="text" name='username' value={username} placeholder="Usuário" onChange={e => setUsername(e.target.value)} />
            <label className="label">Email:</label>
            <InputText id="email" type="email" name='email' value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <label className="label">Senha:</label>
            <InputText id="password" type="password" name='password' placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label className="label">Confirmar Senha:</label>
            <InputText id="password-confirm" type="password" name='password-confirm' placeholder="Confirmar Senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
            <Button text="Salvar" />
          </form>
        </div>
        <Toast
          type={toastType}
          text={toastText}
          isOpen={toastShow}
          onClose={closeToast}
			  />
      </>
    )
  }
}