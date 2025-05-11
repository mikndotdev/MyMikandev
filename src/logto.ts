import { UserScope, LogtoNextConfig } from "@logto/next";

export const logtoConfig: LogtoNextConfig = {
	scopes: [UserScope.Email, UserScope.CustomData, UserScope.Identities, UserScope.Roles, UserScope.Profile, "all"],
	resources: ["https://my.mikandev.com/dashboard"],
	appId: process.env.LOGTO_ID as string,
	appSecret: process.env.LOGTO_SECRET as string,
	endpoint: process.env.LOGTO_URL as string,
	baseUrl: process.env.APP_URL as string,
	cookieSecret: process.env.AUTH_SECRET as string,
	cookieSecure: process.env.NODE_ENV === "production",
};
