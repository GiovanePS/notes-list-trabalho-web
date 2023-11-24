"use client"

import DashboardNavBar from './(components)/DashboardNavBar';
import Notes from './(components)/Notes';
import InputNote from './(components)/InputNote';

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

  if (true) {
    return (
		<>
			<div>
				<DashboardNavBar />
				<Notes />
			</div>
		</>
	);
  }
}
