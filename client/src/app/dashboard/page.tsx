"use client"

import DashboardNavBar from './(components)/DashboardNavBar';
import Notes from './(components)/Notes';
import React, { useEffect, useState } from 'react';
import { checkAuth } from '@/services/authService';
import { useRouter, useSearchParams } from 'next/navigation';
import Toast from '../(components)/Toast';

export default function Dashboard() {
  const router = useRouter()

	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
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
    const updatedUser = searchParams.get('updateduser')

		if (updatedUser === "true") {
			showToast("success", "Usuário atualizado com sucesso!")
		}
  }, [])


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

  if (isAuthenticated) {
    return (
		<>
			<DashboardNavBar />
			<Notes />
			<Toast
				type={toastType}
				text={toastText}
				isOpen={toastShow}
				onClose={closeToast}
			/>
		</>
	);
  }
}
