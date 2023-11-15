import type { Metadata } from "next";
import HomeNavBar from "@/app/(components)/HomeNavBar";

export const metadata: Metadata = {
	title: "Login",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<HomeNavBar />
			<div className="min-h-screen flex flex-col justify-center items-center bg-white text-white mt-0.5">
				<div className="w-full max-w-xs">{children}</div>
			</div>
		</>
	);
}
