import type { Metadata } from 'next'
import Image from 'next/image'
import noteIcon from './(public)/note-icon.png'

export const metadata: Metadata = {
  title: 'Login',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-br">
      <body>
        <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-[#005CE6] text-xl'>
          <Image className='mb-2' src={noteIcon} width={25} height={25} alt='Ícone de Anotação'></Image>
          <div className='p-6 bg-white border border-gray-200 shadow-2xl shadow-white rounded-md'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}