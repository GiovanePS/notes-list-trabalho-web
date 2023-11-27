import type { Metadata } from "next";
import HomeNavBar from "@/app/(components)/HomeNavBar";

export const metadata: Metadata = {
	title: "Registrar-se!" /*Utilizado para personalizar o título da guia do navegador.*/
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<>{children}</>
	);
}

/*Não adiciona nenhuma estrutura visual específica ou layout ao conteúdo da página. Ele apenas repassa o conteúdo (children) recebido diretamente.*/