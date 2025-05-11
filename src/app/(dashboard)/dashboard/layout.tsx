import { Toaster } from "sonner";
import ActionBar from "@/app/components/ActionBar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<Toaster richColors position={"bottom-center"} />
			{children}
			<ActionBar />
		</main>
	);
}
