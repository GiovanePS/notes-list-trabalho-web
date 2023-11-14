import type { Metadata } from 'next'
import Link from "next/link";
import InputText from '@/app/(components)/InputText';
import Button from '@/app/(components)/Button';


export const metadata: Metadata = {
  title: "Login"
}

export default function LoginPage() {
  return (
		<>
			<h1 className="header1">Sign in</h1>
			<form className="px-8 pt-6 pb-8 mb-4">
				<InputText id="username" type="text" placeholder="Username" />
				<InputText id="password" type="password" placeholder="Password" />
				<Button text="Sign in" />
				<div className="mt-6 text-center text-gray-700 text-sm">
					Don't have an account?{" "}
					<Link href="/cadastro" className="text-blue-400 hover:text-blue-300">
						Register here
					</Link>
				</div>
			</form>
		</>
  );
}