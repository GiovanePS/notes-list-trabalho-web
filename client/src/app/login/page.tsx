import type { Metadata } from 'next'
import Image from 'next/image'
import noteIcon from '../../../public/login-page/note-icon.png'

export const metadata: Metadata = {
  title: "Login"
}

export default function LoginPage() {
  return (
    <>
      <div className='min-h-screen flex flex-col justify-center items-center bg-[#005CE6]'>
        <Image className='mb-2' src={noteIcon} width={25} height={25} alt='Ícone de Anotação'></Image>
        <div className='p-4 bg-white border border-gray-200 shadow-2xl shadow-white rounded-md'>
          <h1 className='flex justify-center mb-2 font-bold'>Entrar</h1>
          <form>
            <div className='flex flex-col'>
              <label>Usuário </label>
              <input className='input-login' type='text'></input>
              <label>Senha </label>
              <input className='input-login' type='password'></input>
              <div className='flex justify-center mt-2'>
                <input className='bg-[#005CE6] mt-2 text-slate-100 px-2 border border-blue-700 rounded-md 
                hover:bg-[#003AE6] hover:border-blue-900' type='submit' value="Entrar"></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}