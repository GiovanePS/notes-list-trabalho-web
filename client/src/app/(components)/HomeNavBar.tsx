import Link from "next/link";

export default function HomeNavBar() {
	return (
		<nav className="shadow">
			<div className="px-2 py-3 flex justify-between ">
				<div>
					<Link href="/home" className="link">
						Home
					</Link>
				</div>
				<div>
					<Link href="/register" className="link">
						Registrar-se
					</Link>
					<Link href="/login" className="link">
						Entrar
					</Link>
				</div>
			</div>
		</nav>
	);
}
