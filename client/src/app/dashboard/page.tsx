"use client"

import {Header} from '@/app/(components)/Header';
import InputTodo from '../(components)/InputTodo';
import ListTodos from '../(components)/ListTodos';
import React, { useEffect, useState } from 'react';
import { checkAuth } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function Dashboard(){
  const router = useRouter()

	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchAuthStatus = async () => {
			try {
				const checkingAuth: any = await checkAuth()
				setIsAuthenticated(checkingAuth)
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
          <div className="bg-indigo-200 w-full h-screen">
            <br />
            <InputTodo/>
            <ListTodos/>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        401 Unauthorized Error
      </>
    )
  }
}