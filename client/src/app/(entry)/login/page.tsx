import type { Metadata } from 'next'
import Button from '../(components)/Button'

export const metadata: Metadata = {
  title: "Login"
}

export default function LoginPage() {
  return (
    <>
      <h1 className='flex justify-center mb-2 font-bold'>Entrar</h1>
      <form>
        <div className='flex flex-col'>
          <label>Usuário </label>
          <input className='input-entry' type='text'></input>
          <label>Senha </label>
          <input className='input-entry' type='password'></input>
          <div className='flex justify-center mt-2'>
            <Button texto='Entrar'/>
          </div>
        </div>
      </form>
    </>
  )
}