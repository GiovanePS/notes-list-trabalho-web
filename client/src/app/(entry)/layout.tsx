import type { Metadata } from 'next'
import Image from 'next/image'
import noteIcon from './(public)/note-icon.png'

export const metadata: Metadata = {
  title: 'Login',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-white text-white">
			<div className="w-full max-w-xs">
				{children}
			</div>
		</div>
  );
}