
import { useContext } from 'react'
import Link from 'next/link'
import Image from "next/image";
import Button from './Button';


export  function Header(){

    return(
        <header className="bg-white">
        <nav className="flex justify-between items-center w-[92%]  mx-auto">
            <div>
                <Link href="/dashboard" legacyBehavior>
                        <Image src="/home/notepad.png"
                            className='cursor-pointer'
							width={30}
							height={30}
							alt="Left Bro"
							priority>
                        </Image>
                    </Link>

            </div>
            <div className="flex items-center gap-6">
            <Button text="Log out" />
            </div>
            </nav>
    </header>
            
    )
}

