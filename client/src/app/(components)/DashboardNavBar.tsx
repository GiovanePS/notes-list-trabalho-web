import Link from "next/link";
import Image from "next/image";

export default function DashboardNavBar() {
	return (
		<nav className="shadow">
			<div className="px-6 py-2 flex justify-between ">
				<div className="flex items-center justify-between">
                    <Image
                        src="/home/notepad-icon.png"
                        width={24}
                        height={33}
                        alt="notepad-icon"
                    />
				</div>
				<div>
					<Link href="/home" className="link">
						Log out
					</Link>
				</div>
			</div>
		</nav>
	);
}
