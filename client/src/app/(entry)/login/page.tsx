import type { Metadata } from 'next'
import Link from "next/link";
import Button from '../(components)/Button'

export const metadata: Metadata = {
  title: "Login"
}

export default function LoginPage() {
  return (
		<>
			<h1 className="flex justify-center mb-4 font-bold text-gray-700">Sign in</h1>
			<form className="px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Username"
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="*********"
					/>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Log In
					</button>
				</div>
				<div className="mt-6 text-center text-gray-700 ">
					Don't have an account?{" "}
					<Link href="/cadastro" className="text-blue-400 hover:text-blue-300">
						Register here
					</Link>
        </div>
			</form>
		</>
  );
}