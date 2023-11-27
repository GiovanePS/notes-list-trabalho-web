import type { Metadata } from "next";
import HomeNavBar from "@/app/(components)/HomeNavBar";

export const metadata: Metadata = {
	title: "Registrar-se!"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<>{children}</>
	);
}