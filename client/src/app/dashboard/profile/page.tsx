"use client"

import InputText from "@/app/(components)/InputText";
import Button from "@/app/(components)/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/services/authService";


export default function Profile() {
    const router = useRouter()

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
                const response = await fetch('http://localhost:5000/getuser', {
                    method: 'GET',
                    headers: { "Content-Type": "application/json"},
                    credentials: 'include'
                })
    
                const userData = await response.json()

                if (userData) {
                    console.log(userData.username, userData.email)
                    setUsername(userData.username || '')
                    setEmail(userData.email || '')
                }
            } catch (error) {
                console.error(error)
            }
        }

        getUserData()
    }, [])

    const submitHandler = () => {
        
    }
    
    if (isAuthenticated) {
        return (
            <div className="container mx-auto max-w-sm">
                <h1 className="header">Atualizar Perfil</h1>
                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                    <label className="label">Usuario:</label>
                    <InputText id="username" type="text" name='username' value={username} placeholder="Usuário" onChange={e => setUsername(e.target.value)} />
                    <label className="label">Email:</label>
                    <InputText id="email" type="email" name='email' value={email} placeholder="Email" />
                    <label className="label">Senha:</label>
                    <InputText id="password" type="password" name='password' placeholder="Senha" />
                    <label className="label">Confirmar Senha:</label>
                    <InputText id="password-confirm" type="password" name='password-confirm' placeholder="Confirmar Senha" />
                    <Button text="Salvar" />
                </form>
            </div>
        );
    }
}