import type { Metadata } from "next";
import TopNavBar from "@/app/(components)/HomeNavBar";

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
			<TopNavBar />
			{children}
		</div>
	);
}
