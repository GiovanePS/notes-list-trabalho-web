import type { Metadata } from 'next'
import Link from "next/link";
// import InputText from '@/app/(components)/Button'
import {Header} from '@/app/(components)/Header';
import InputTodo from '../(components)/InputTodo';
import ListTodos from '../(components)/ListTodos';
import React, {Fragment} from 'react';

export const metadata: Metadata = {
  title: 'Notes'
}

export default function Dashboard(){
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
}