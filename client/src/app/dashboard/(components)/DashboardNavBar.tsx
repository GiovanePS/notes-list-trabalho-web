import Link from 'next/link'
import Image from "next/image";
import Button from '../../(components)/Button';
import { useRouter } from 'next/navigation';
import notepadImage from '../../../../public/header/notepad-mobile.png'


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
			<div className="px-6 py-2 flex justify-between">
				<div className="flex items-center justify-between">
					<Link href="/dashboard" legacyBehavior>
						<Image
							src={notepadImage}
							width={24}
							height={33}
							alt="Left Bro"
							priority
						></Image>
					</Link>
				</div>
				<div>
					<Button text="Sair" onClick={logoutHandler} />
				</div>
			</div>
		</nav>
	);
};

