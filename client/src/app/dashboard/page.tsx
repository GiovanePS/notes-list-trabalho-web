import type { Metadata } from 'next'
import Link from "next/link";
// import InputText from '@/app/(components)/Button'
import {Header} from '@/app/(components)/Header';

export const metadata: Metadata = {
  title: 'Notes'
}

export default function Dashboard(){
    return(
        <>
        <div>
          <Header/>
          <div className="bg-indigo-200 w-full h-screen">
            <h1>teste</h1>
          </div>
        </div>
        
        </>
    )
}