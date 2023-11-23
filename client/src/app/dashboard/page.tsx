import type { Metadata } from "next";
import React from "react";
import DashboardNavBar from "@/app/(components)/DashboardNavBar";
import InputNote from "@/app/(components)/InputNote";
import AreaInputNote from "@/app/(components)/AreaInputNote";


export const metadata: Metadata = {
	title: "Notes",
};

export default function Dashboard() {
	return (
		<>
			<div>
				<DashboardNavBar />
				<InputNote />
				{/* List Notes */}
			</div>
		</>
	);
}
