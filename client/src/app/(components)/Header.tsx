import Link from 'next/link'
import Image from "next/image";
import Button from './Button';
import { useRouter } from 'next/navigation';


export  function Header(){
    const router = useRouter()

    const logoutHandler = async () => {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        router.push('/login')
    }

    return(
        <header className="bg-white">
        <nav className="flex justify-between items-center w-[92%]  mx-auto">
            <div className='flex items-center'>
                <Link href="/dashboard" legacyBehavior>
                        <Image src="/home/(public)/notepad-desktop.jpg"
                            className='cursor-pointer'
							width={30}
							height={30}
							alt="Left Bro"
							priority>
                        </Image>
                    </Link>
                <h1 className='ml-2'>Notes List</h1>
            </div>
            <div className="flex items-center gap-6">
            <Button text="Log out" type='button' onClick={logoutHandler}/>
            </div>
            </nav>
    </header>
            
    )
}

