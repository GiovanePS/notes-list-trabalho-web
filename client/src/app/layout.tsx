import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NoteTaskList',
}

export default function RootLayout({children}: {children: React.ReactNode}) { /*Função de layout básico da aplicação. Children representa o conteúdo que será renderizado dentro do layout.*/
  return (
		<html lang="pt-br">
			<head>
				<title>NotesApp</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
					rel="stylesheet"
				/>
				<link rel="shortcut icon" href="/favicon.png"/>
			</head>

			<body>{children}</body>
		</html>
  );
}
