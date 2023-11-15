import Link from "next/link";
import Image from "next/image";

export default function TopNavBar() {
	return (
		<nav className="shadow">
			<div className="px-2 py-3 flex justify-between ">
				<div>
					<a href="/home" className="link">Home</a>
					<a href="/dashboard" className="link">Dashboard</a>
				</div>
				<div>
					<a href="/register" className="link">Register</a>
					<a href="/login" className="link">Log in</a>
				</div>
			</div>
		</nav>
	);
}
