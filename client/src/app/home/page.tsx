import Button from "@/app/(components)/Button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="container mx-auto">
			<div className="flex justify-center min-h-screen">
				<div className="flex md:flex-row items-center justify-between py-10">
					{/* Illustration Left */}
					<div className="hidden md:block">
						<Image
							src="/home/left-desktop.png"
							width={207}
							height={320}
							alt="Left Bro"
							priority
						/>
					</div>
					{/* Content Center */}
					<div className="flex flex-col items-center text-center max-w-sm m-8">
						<div className="block md:hidden">
							<Image
								src="/home/notepad.png"
								width={68}
								height={93}
								alt="Notepad"
							/>
						</div>
						<div className="hidden md:block">
							<Image
								src="/home/notepad.png"
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
								src="/home/both-mobile.png"
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
							src="/home/right-desktop.png"
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
