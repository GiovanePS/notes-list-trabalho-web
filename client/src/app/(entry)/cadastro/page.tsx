import type { Metadata } from 'next'
import Link from "next/link";
import Button from '../(components)/Button'

export const metadata: Metadata = {
  title: 'Cadastre-se!'
}

export default function SignUpPage() {
  return (
		<>
			<h1 className="flex justify-center mb-6 font-bold text-gray-700">
				Sign up
			</h1>
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
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						placeholder="Email"
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
						Register
					</button>
				</div>
				<div className="mt-6 text-center text-gray-700">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-blue-400 hover:text-blue-300"
					>
						Login here
					</Link>
				</div>
			</form>
		</>
  );
}