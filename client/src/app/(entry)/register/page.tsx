import type { Metadata } from 'next'
import Link from "next/link";
import InputText from '@/app/(components)/InputText'
import Button from '@/app/(components)/Button'

export const metadata: Metadata = {
  title: 'Register'
}

export default function RegisterPage() {
  return (
		<>
			<h1 className="header1">Sign up</h1>
			<form className="px-8 pt-6 pb-8 mb-4">
				<InputText id="username" type="text" name='username' placeholder="Username" />
				<InputText id="email" type="email" name='email' placeholder="Email" />
				<InputText id="password" type="password" name='password' placeholder="Password" />
				<Button text="Register" />
				<div className="mt-6 text-center text-gray-700 text-[15px]">
					Already have an account?{" "}
					<Link href="/login" className="text-blue-400 hover:text-blue-300">
						Login here
					</Link>
				</div>
			</form>
		</>
  );
}