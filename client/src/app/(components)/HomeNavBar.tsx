import Link from "next/link";
import Button from "@/app/(components)/Button";

export default function HomeNavBar() {
	return (
		<nav className="shadow">
			<div className="px-2 py-3 flex justify-between items-center">
				<div className="flex">
					<Link href="/home" className="link">
						<Button text="Home" color="gray" />
					</Link>
				</div>
				<div className="flex">
					<Link href="/register" className="link">
						<Button text="Registrar-se" color="gray" />
					</Link>
					<Link href="/login" className="link">
						<Button text="Entrar" color="gray" />
					</Link>
				</div>
			</div>
		</nav>
	);
}
