import type { Metadata } from "next";
import HomeNavBar from "@/app/(components)/HomeNavBar";

export const metadata: Metadata = {
	title: "Entrar",
};

export default function RootLayout({children}: {children: React.ReactNode}) { /*Representa um layout base para a página de entrada ("Entrar").*/
	return (
		<>
			<HomeNavBar />
			<div className="min-h-screen flex flex-col justify-center items-center bg-white text-white mt-0.5">
				<div className="w-full max-w-xs">{children}</div> {/*renderiza um contêiner flexível Que cobre no mínimo a altura da tela centrado verticalmente e horizontalmente */}
			</div>
		</>
	);
}
