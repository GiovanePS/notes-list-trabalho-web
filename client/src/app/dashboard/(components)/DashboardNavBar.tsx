"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NoteIcon from "../../(components)/NoteIcon";
import Button from "@/app/(components)/Button";
import notepad_icon from '../(public)/notepad-icon.png'
import { baseUrl } from "@/config";

export default function DashboardNavBar() {
	const router = useRouter();

	const logoutHandler = async () => { /*Função assíncrona chamada quando o botão "Sair" é clicado na barra de navegação.*/
		const response = await fetch(`${baseUrl}/logout`, { /*Utiliza a API fetch para fazer uma solicitação GET para a URL "${baseUrl}/logout" com as opções especificadas.*/
			method: "GET",
			headers: { "Content-Type": "application/json" }, /*Indica que os dados são do tipo Json*/
			credentials: "include", /*Inclui cookies na solicitação*/
		});

		router.push("/login"); /*Após a conclusão da solicitação, redireciona o usuário para a página de login.*/
	};

	return (
		<nav className="shadow">
			<div className="px-6 py-2 flex justify-between items-center">
				<div className="flex items-center justify-between">
					<Link href="/dashboard" legacyBehavior>
						<Image
							className="cursor-pointer"
							src={ notepad_icon }
							width={24}
							height={33}
							alt="notepad icon"
							priority
						></Image>
					</Link>
				</div>
				<div className="flex items-center justify-between space-x-2 mr-4">
					<Link href="/dashboard/profile" className="link">
						<NoteIcon name="person" />
					</Link>
					<Button text="Sair" color="gray" onClick={logoutHandler} />
				</div>
			</div>
		</nav>
	);
}
