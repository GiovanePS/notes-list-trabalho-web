import { checkAuth } from "@/services/authService";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
	title: "Notes",
};

export default function RootLayout({children}: {children: React.ReactNode}) {	
	return (
		<>{children}</>
	)
}
