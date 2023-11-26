"use client"
import Link from 'next/link'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import NoteIcon from "./NoteIcon"


export default function DashboardNavBar(){
    const router = useRouter()

    const logoutHandler = async () => {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        router.push('/login')
    }

    return (
		<nav className="shadow">
			<div className="px-6 py-2 flex justify-between items-center">
				<div className="flex items-center justify-between">
					<Link href="/dashboard" legacyBehavior>
						<Image
							src="/home/notepad-icon.png"
							width={24}
							height={33}
							alt="Left Bro"
							priority
						></Image>
					</Link>
				</div>
				<div className="flex items-center justify-between space-x-2 mr-4">
					<NoteIcon name="contrast" />
					<Link
						href="/dashboard/profile"
						className="link"
					>
						<NoteIcon name="person" />
					</Link>
					<a
						href="/logout" // This can be a dummy href if you're handling logout on the client-side
						onClick={(e) => {
							e.preventDefault(); // Prevent default navigation
							logoutHandler();
						}}
						className="link"
					>
						Sair
					</a>
				</div>
			</div>
		</nav>
	);
};

