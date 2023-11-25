import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NoteTaskList',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
		<html lang="pt-br">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
					rel="stylesheet"
				/>
			</head>

			<body>{children}</body>
		</html>
  );
}
