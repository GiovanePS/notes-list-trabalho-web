import type { Metadata } from 'next'
import Button from '../(components)/Button'

export const metadata: Metadata = {
  title: 'Cadastre-se!'
}

export default function SignUpPage() {
  return (
    <>
      <h1 className='flex justify-center mb-6 font-bold'>Cadastre-se!</h1>
      <form>
        <div className='flex flex-col'>
          <label>Digite um nome de usuário:</label>
          <input className='input-entry' type='text'></input>
          <label>Digite seu e-mail:</label>
          <input className='input-entry' type='email'></input>
          <label>Digite sua senha:</label>
          <input className='input-entry' type='password'></input>
          <div className='flex justify-center mt-2'>
            <Button texto='Cadastrar'/>
          </div>
        </div>
      </form>
    </>
  )
}