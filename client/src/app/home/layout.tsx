import type { Metadata } from "next";
import HomeNavBar from "@/app/(components)/HomeNavBar";

export const metadata: Metadata = {
	title: "Home",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-white">
			<HomeNavBar />
			{children}
		</div>
	);
}
