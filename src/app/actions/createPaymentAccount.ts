"use server";
import { Polar } from "@polar-sh/sdk";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/logto";

const polar = new Polar({
	accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
});

const getLogtoAccessKey = async () => {
	const tokenRes = await fetch(`${process.env.LOGTO_URL}/oidc/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(`${process.env.LOGTO_M2M_ID}:${process.env.LOGTO_M2M_SECRET}`).toString("base64")}`,
		},
		body: new URLSearchParams({
			grant_type: "client_credentials",
			scope: "all",
			resource: "https://default.logto.app/api",
		}),
	});
	if (!tokenRes.ok) {
		throw new Error(`Failed to get Logto token: ${tokenRes.statusText}`);
	}
	const data = await tokenRes.json();
	return data.access_token;
};

export async function createPaymentAccount() {
	const { claims } = await getLogtoContext(logtoConfig);
	const customer = await polar.customers.create({
		email: claims?.email as string,
		name: claims?.name as string,
	});
	const accessToken = await getLogtoAccessKey();
	const logtoResponse = await fetch(`${process.env.LOGTO_URL}/api/users/${claims?.sub}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			customData: {
				polar_cid: customer.id,
			},
		}),
	});
	if (!logtoResponse.ok) {
		throw new Error(`Failed to update Logto user: ${logtoResponse.statusText}`);
	}
	const portalSession = await polar.customerSessions.create({
		customerId: customer.id,
	});
	return portalSession.customerPortalUrl;
}
