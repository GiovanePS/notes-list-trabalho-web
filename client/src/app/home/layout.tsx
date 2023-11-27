import type { Metadata } from "next";
import HomeNavBar from "@/app/(components)/HomeNavBar";

export const metadata: Metadata = {
	title: "Home", /*Definição de metadados da página, especificamente o título da página como "Home".*/
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode; /* children representa o conteúdo que será renderizado dentro do layout.*/
}) {
	return (
		<div className="bg-white">
			<HomeNavBar />
			{children} {/* {children} é usado para renderizar o conteúdo da página que está utilizando este layout. Isso permite que diferentes páginas tenham conteúdos específicos, mas compartilhem o mesmo layout.*/}
		</div>
	);
}
