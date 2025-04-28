import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

import Image from "next/image";

import Logo from "@/app/assets/img/mikan-vtube-transparent.png";

export default async function Login() {
	const session = await auth();

	if (session) {
		console.log(session);
		await redirect("/dashboard");
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center text-center p-4">
			<div className="w-full max-w-4xl">
				<Image
					src={Logo.src}
					alt="Logo"
					width={200}
					height={200}
					className="mx-auto mb-4"
				/>
				<h1 className={"text-2xl"}>Manage your account</h1>
				<form
					action={async () => {
						"use server";
						await signIn("logto");
					}}
				>
					<button type="submit" className={"btn btn-success mt-3"}>
						Sign in
					</button>
				</form>
			</div>
		</main>
	);
}
