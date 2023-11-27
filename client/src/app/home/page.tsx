import Button from "@/app/(components)/Button";
import Image from "next/image";
import Link from "next/link";
import left_desktop from './(public)/left-desktop.png'
import right_desktop from './(public)/right-desktop.png'
import notepad_desktop from './(public)/notepad-desktop.png'
import notepad_mobile from './(public)/notepad-mobile.png'
import both_mobile from './(public)/both-mobile.png'

export default function HomePage() {
	return (
		<div className="container mx-auto">
			<div className="flex justify-center h-full mt-8 md:h-[calc(100vh-58px)] md:mt-0">
				<div className="flex md:flex-row items-center justify-between">
					{/* Illustration Left */}
					<div className="hidden md:block">
						<Image
							src={ left_desktop }
							width={207}
							height={320}
							alt="Left Bro"
							priority
						/>
					</div>
					{/* Content Center */}
					<div className="flex flex-col items-center text-center max-w-sm">
						<div className="block md:hidden">
							<Image
								src={ notepad_mobile }
								width={68}
								height={93}
								alt="Notepad"
							/>
						</div>
						<div className="hidden md:block">
							<Image
								src={ notepad_desktop }
								width={135}
								height={184}
								alt="Bro and Girl"
							/>
						</div>

						<h1 className="text-5xl  my-10">Note List</h1>
						<p className="mb-6 text-lg text-gray-700">
							O Note List possibilita que você tenha mais
							organização, do trabalho ao lazer.
						</p>
						<div className="block md:hidden my-4">
							<Image
								src={ both_mobile }
								width={202}
								height={146}
								alt="Bro and Girl"
							/>
						</div>
						<Link href="/register">
							<Button text="Get Started" />
						</Link>
					</div>
					{/* Illustration Right */}
					<div className="hidden md:block">
						<Image
							src={ right_desktop }
							width={150}
							height={360}
							alt="Right Girl"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
