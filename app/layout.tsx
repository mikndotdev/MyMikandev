import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const hsr = localFont({ src: "./assets/HSR.woff2" });

export const metadata: Metadata = {
	title: "MyMikanDev",
	description: "Manage your MikanDev account",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${hsr.className} antialiased`}>
				<SessionProvider>
					<Toaster richColors position={"bottom-center"} />
					{children}
				</SessionProvider>
			</body>
		</html>
	);
}
