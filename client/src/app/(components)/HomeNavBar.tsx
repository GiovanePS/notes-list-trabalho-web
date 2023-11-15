import Link from "next/link";
import Image from "next/image";

export default function TopNavBar() {
	return (
		<nav className="shadow">
			<div className="px-6 py-3 flex justify-between items-center">
				<div>
					<Link href="/home">
						<Image
							src="/home/notepad-icon.png"
							width={25}
							height={34}
							alt="notepad-icon"
							priority
						></Image>
					</Link>
				</div>
				<div>
					<a href="/register" className="link">
						Register
					</a>
					<a href="/login" className="link">
						Log in
					</a>
				</div>
			</div>
		</nav>
	);
}
