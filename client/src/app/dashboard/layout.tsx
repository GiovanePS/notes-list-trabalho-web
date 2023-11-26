import type { Metadata } from "next";
import DashboardNavBar from "./(components)/DashboardNavBar";

export const metadata: Metadata = {
	title: "Notas",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<>
			<DashboardNavBar />
			{children}
		</>
	);
}
