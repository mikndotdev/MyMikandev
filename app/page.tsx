export const runtime = "edge";

import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";

export default async function Index() {
	const session = await auth();

	if (session) {
		return redirect(`${process.env.APP_URL}/dashboard`);
	}

	if (!session) {
		await signIn("logto", {
			redirectTo: `/dashboard`,
		});
	}
}