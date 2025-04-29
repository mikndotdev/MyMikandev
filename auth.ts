import NextAuth from "next-auth";
import Logto from "next-auth/providers/logto";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Logto({
			authorization: {
				params: {
					scope: "openid offline_access profile email identities roles custom_data",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;

			}
			return token;
		},
		async session({ session, token }) {
			console.log(token);
			session.user.id = token.sub as string;
			session.accessToken = token.accessToken;
			return session;
		},
	},
});
