import { Polar } from "@polar-sh/sdk";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/logto";
import { NextResponse } from "next/server";

const polar = new Polar({
	accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
});

export async function GET() {
	const { userInfo } = await getLogtoContext(logtoConfig, { fetchUserInfo: true });

	// @ts-ignore
	if (userInfo?.custom_data.polar_cid) {
		const result = await polar.customerSessions.create({
			// @ts-ignore
			customerId: userInfo?.custom_data.polar_cid,
		});
		return NextResponse.redirect(result.customerPortalUrl);
	}
	return NextResponse.json({ error: "User does not have a Polar Customer Account" });
}
