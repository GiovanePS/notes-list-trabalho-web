"use client"

import Header from './(components)/Header';
import Notes from './(components)/Notes';
import React, { useEffect, useState } from 'react';
import { checkAuth } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter()

	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

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
    return(
      <>
        <div>
          <Header/>
          <div className="bg-[#242424] w-full h-screen">
            <br />
            <Notes />
          </div>
        </div>
      </>
    )
  }
}